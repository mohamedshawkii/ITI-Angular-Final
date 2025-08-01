import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';

@Component({
  selector: 'app-available-orders',
  imports: [],
  templateUrl: './available-orders-user.html',
  styleUrl: './available-orders-user.scss'
})
export class AvailableOrdersUser implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  OrderId: number = 0;
  UserId!: string;
  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetMadeOrders();
  }

  GetMadeOrders() {
    this._OrderService.GetMadeOrders(this.UserId).subscribe({
      next: (data: IOrder[]) => {
        this.filteredOrders = data.filter(order => order.status == 0);
        this.orders = this.filteredOrders;
      
        this.pageSize = this.pageSize > 0 ? this.pageSize : 1;
        this.totalPages = Math.ceil(this.orders.length / this.pageSize);

        if (this.totalPages > 0 && Number.isFinite(this.totalPages)) {
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        } else {
          this.totalPagesArray = [];
        }
        this.updateDisplayedOrders();
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  CancelOrder(Order: IOrder): void {
    Order.status = 3;
    this._OrderService.OrderUpdate(Order).subscribe({
      next: (data) => {
        alert('Order Canceled');
        this.GetMadeOrders();
      },
      error: (error) => {
        console.error('Error taking order:', error);
      }
    });
  }

  updateDisplayedOrders(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.orders = this.filteredOrders.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedOrders();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedOrders();
    }
  }

}
