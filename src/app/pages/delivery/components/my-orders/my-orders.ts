import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';

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
  DeliveryID!: string;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.DeliveryID = this._AuthService.getCurrentUserID()!;
    this.GetAvailable();
  }

  GetAvailable() {
    this._OrderService.MyOrders(this.DeliveryID).subscribe({
      next: (data: any[]) => {
        this.orders = data.filter(order => order.status === 1 || order.status === 2 || order.status === 4 || order.status === 5 || order.status === 6 || order.status === 7);
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
    this.pageSize = this.pageSize > 0 ? this.pageSize : 1;
    this.totalPages = Math.ceil(this.orders.length / this.pageSize);

    if (this.totalPages > 0 && Number.isFinite(this.totalPages)) {
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      this.totalPagesArray = [];
    }
    this.updateDisplayedUsers();
  }

  ReturningOrder(Order: IOrder): void {
    Order.status = 7;
    this._OrderService.OrderUpdate(Order).subscribe({
      next: (data) => {
        console.log('Returning Order:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error Returning Order:', error);
      }
    });
  }

  DeliveryUserHandingRequest(Order: IOrder): void {
    Order.status = 5;
    this._OrderService.OrderUpdate(Order).subscribe({
      next: (data) => {
        console.log('request handing:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error handing order:', error);
      }
    });
  }

  GiveUpOrder(orderId: number, DeliveryID: string): void {
    this._OrderService.ReleaseOrder(orderId, DeliveryID).subscribe({
      next: (data) => {
        console.log('request handing to brand:', data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error releasing order:', error);
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
