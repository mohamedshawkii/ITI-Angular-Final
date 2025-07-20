import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../Services/Delivery-service';
import { IOrder } from '../../../../interfaces/IOrder';

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss'
})
export class MyOrders {
  orders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  deliveryBoyId: string = '';
  _OrderService = inject(OrderService);

  constructor() { }

  ngOnInit(): void {
    this.GetAvailable();
  }
  GetAvailable() {
    this._OrderService.AvailableOrders().subscribe({
      next: (data: any[]) => {
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
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }
  GiveUpOrder(orderId: number, deliveryBoyId: string): void {
    this._OrderService.ReleaseOrder(orderId, deliveryBoyId).subscribe({
      next: (data) => {
        console.log('Order released successfully:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error releasing order:', error);
      }
    });
  }

  DeliverdOrder(orderId: number, deliveryBoyId: string): void {
    this._OrderService.DeliverdOrder(orderId, deliveryBoyId).subscribe({
      next: (data) => {
        console.log('Order delivered successfully:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error delivering order:', error);
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
