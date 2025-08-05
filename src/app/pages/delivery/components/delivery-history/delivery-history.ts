import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '@services/order-service'; 
import { IOrder } from '@interfaces/IOrder'; 
import { Auth } from '@services/auth'; 
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-delivery-history',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './delivery-history.html',
  styleUrl: './delivery-history.scss'
})
export class DeliveryHistory implements OnInit {
  DeliveryID!: string;
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);
  constructor() { }

  ngOnInit(): void {
    this.DeliveryID = this._AuthService.getCurrentUserID()!;
    this.GetOrdersHistory(this.DeliveryID);
  }

  GetOrdersHistory(DeliveryID: string) {
    this._OrderService.OrdersHistory(DeliveryID).subscribe({
      next: (data: IOrder[]) => {
        this.filteredOrders = data.filter(order => order.status === 2 || order.status === 3);

        this.orders = this.filteredOrders;

        this.calculatePagination();
        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });

  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.orders = this.filteredOrders.slice(start, end);
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
