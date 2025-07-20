import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/Delivery-service';
import { IOrder } from '../../../../interfaces/IOrder';

@Component({
  selector: 'app-delivery-history',
  imports: [],
  templateUrl: './delivery-history.html',
  styleUrl: './delivery-history.scss'
})
export class DeliveryHistory implements OnInit {
  DeliveryID: string = 'b25a1b80-69b9-4553-960d-77212f40defc';
  orders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  _OrderService = inject(OrderService);

  constructor() { }

  ngOnInit(): void {
    this.GetOrdersHistory(this.DeliveryID);
  }
  GetOrdersHistory(DeliveryID: string) {
    this._OrderService.OrdersHistory(DeliveryID).subscribe({
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
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
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
