import { AvailableOrders } from './../../../delivery/components/available-orders/available-orders';
import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { BrandService } from '../../../../Services/brand.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-available-orders-brand',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule
  templateUrl: './available-orders-brand.html',
  styleUrl: './available-orders-brand.scss'
})
export class AvailableOrdersBrand implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];
  BrandID!: number;
  UserID!: string;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);
  _BrandService = inject(BrandService);

  constructor() { }

  ngOnInit(): void {
    this.UserID = this._AuthService.getCurrentUserID()!;
    this.GetBrandId();
  }

  GetBrandId() {
    this._BrandService.GetBrandByUserId(this.UserID).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.BrandID = data[0].id;
          this.GetAvailableOrders();
        } else {
          console.warn('No brand found for this user. Generating dummy available orders.');
          // this.generateDummyOrders(); // Fallback to dummy data
        }
      },
      error: (error) => {
        console.error('Error fetching brand ID:', error);
        // this.generateDummyOrders(); // Fallback to dummy data on error
      }
    });
  }

  GetAvailableOrders() {
    this._OrderService.GetOrderByBrandId(this.BrandID).subscribe({
      next: (data: IOrder[]) => {
        this.filteredOrders = data.filter(order => order.status === 0);
        this.orders = this.filteredOrders;
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

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.orders = this.filteredOrders.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedOrders();
    }
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
