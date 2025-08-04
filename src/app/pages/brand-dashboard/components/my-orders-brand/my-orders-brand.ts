import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { BrandService } from '../../../../Services/brand.service';

@Component({
  selector: 'app-my-orders-brand',
  imports: [],
  templateUrl: './my-orders-brand.html',
  styleUrl: './my-orders-brand.scss'
})
export class MyOrdersBrand implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  deliveryBoyId: string = '';
  IsReceived: boolean = false;
  UserID!: string;
  IsHanded: boolean = false;
  BrandID!: number;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);
  _BrandService = inject(BrandService);

  constructor() { }

  ngOnInit(): void {
    this.UserID = this._AuthService.getCurrentUserID()!;
    this.GetBrandId();

  }

  GetAvailable() {
    this._OrderService.GetOrderByBrandId(this.BrandID).subscribe({
      next: (data: IOrder[]) => {
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

  GetBrandId() {
    this._BrandService.GetBrandByUserId(this.UserID).subscribe({
      next: (data) => {
        this.BrandID = data[0].id;
        // console.log(data);
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error fetching available brands:', error);
      }
    });
  }

  HandOrder(order: IOrder): void {
    order.status = 1;
    this._OrderService.OrderUpdate(order).subscribe({
      next: (data) => {
        console.log('Order handed for delivery successfully:', data);
        this.IsHanded = true;
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error delivering order:', error);
      }
    });
  }

  ReceiveReturning(order: IOrder): void {
    order.status = 3;
    this._OrderService.OrderUpdate(order).subscribe({
      next: (data) => {
        console.log('Order returned:', data);
        this.IsHanded = true;
        this.GetAvailable();
      },
      error: (error) => {
        console.error('Error delivering order:', error);
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
