import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { BrandService } from '../../../../Services/brand.service';

@Component({
  selector: 'app-delivery-history-brand',
  imports: [],
  templateUrl: './delivery-history-brand.html',
  styleUrl: './delivery-history-brand.scss'
})
export class DeliveryHistoryBrand implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  UserId!: string;
  BrandID!: number;

  _OrderService = inject(OrderService);
  _BrandService = inject(BrandService);
  _AuthService = inject(Auth);
  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetBrandId();
  }

  GetAvailable() {
    this._OrderService.GetOrderByBrandId(this.BrandID).subscribe({
      next: (data: IOrder[]) => {
        this.filteredOrders = data.filter(order => order.status === 2 || order.status === 3);

        this.orders = this.filteredOrders;

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
  GetBrandId() {
    this._BrandService.GetBrandByUserId(this.UserId).subscribe({
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
