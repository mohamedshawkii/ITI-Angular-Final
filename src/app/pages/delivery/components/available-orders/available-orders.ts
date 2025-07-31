import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';

@Component({
  selector: 'app-available-orders',
  imports: [],
  templateUrl: './available-orders.html',
  styleUrl: './available-orders.scss'
})
export class AvailableOrders implements OnInit {
  orders: IOrder[] = [];
  CurrActiveOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  OrderId: number = 0;
  DeliveryID!: string;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.DeliveryID = this._AuthService.getCurrentUserID()!;
    this.GetAvailable();
    this.ActiveOrders();
  }

  get hasReachedOrderLimit(): boolean {
    return (this.CurrActiveOrders?.length ?? 0) > 2;
  }


  ActiveOrders() {
    if (this.DeliveryID !== null && this.DeliveryID !== undefined) {
      this._OrderService.GetActiveOrders(this.DeliveryID).subscribe({
        next: (data: IOrder[]) => {
          this.CurrActiveOrders = data;
          // console.log('active:', data);
        },
        error: (error) => {
          console.error('Error fetching active orders:', error);
        }
      });
    }

  }


  GetAvailable() {
    this._OrderService.AvailableOrders().subscribe({
      next: (data: IOrder[]) => {
        this.orders = data.filter(order => order.status === 0);
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

  TakeOrder(Order: IOrder): void {
    Order.status = 4;
    this._OrderService.AssignOrder(Order.id, this.DeliveryID).subscribe({
      next: (data) => {
        console.log('Take Order:', data);
      },
      error: (error) => {
        console.error('Error updating order:', error);
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
