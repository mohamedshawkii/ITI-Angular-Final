import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';

@Component({
  selector: 'app-my-orders',
  imports: [],
  templateUrl: './my-orders-user.html',
  styleUrl: './my-orders-user.scss'
})
export class MyOrdersUser {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  deliveryBoyId: string = '';
  IsReceived: boolean = false;
  UserId!: string;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetAvailable();
  }

  GetAvailable() {
    this._OrderService.GetMadeOrders(this.UserId).subscribe({
      next: (data: any[]) => {
        this.filteredOrders = data.filter(order => order.status === 1 || order.status === 2 || order.status === 4 || order.status === 5 || order.status === 6 || order.status === 7);
        this.orders = this.filteredOrders;
        this.calculatePagination();
        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  ReceiveOrder(Order: IOrder): void {
    Order.status = 2;
    this._OrderService.OrderUpdate(Order).subscribe({
      next: (data) => {
        alert('Order Received');
        // console.log('Order Received successfully:', data);
        this.IsReceived = true;
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error taking order:', error);
      }
    });
  }

  UserDeliveryHandingRequest(Order: IOrder): void {
    Order.status = 6;
    this._OrderService.OrderUpdate(Order).subscribe({
      next: (data) => {
        // console.log('request handing:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error handing order:', error);
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
