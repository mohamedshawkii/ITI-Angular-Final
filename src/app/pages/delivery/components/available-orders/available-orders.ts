import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/Delivery-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Delivery } from '../../delivery';

@Component({
  selector: 'app-available-orders',
  imports: [],
  templateUrl: './available-orders.html',
  styleUrl: './available-orders.scss'
})
export class AvailableOrders implements OnInit {
  orders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  OrderId: number = 0;
  // DeliveryID: string = 'b25a1b80-69b9-4553-960d-77212f40defc';
  _OrderService = inject(OrderService);

  constructor() { }

  ngOnInit(): void {
    this.GetAvailable();
  }

  GetAvailable() {
    this._OrderService.AvailableOrders().subscribe({
      next: (data: IOrder[]) => {
        this.orders = data;
        console.log(data);

        this.pageSize = this.pageSize > 0 ? this.pageSize : 1;
        this.totalPages = Math.ceil(this.orders.length / this.pageSize);

        if (this.totalPages > 0 && Number.isFinite(this.totalPages)) {
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        } else {
          this.totalPagesArray = [];
        }

        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  takeOrder(OrderId: number, DeliveryID: string): void {
    this._OrderService.AssignOrder(OrderId, DeliveryID).subscribe({
      next: (data) => {
        console.log('Order taken successfully:', data);
        // Optionally, refresh the list of available orders
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error taking order:', error);
      }
    });
  }

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.orders = this.orders.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

}
