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
  displayedOrders: IOrder[] = []; // Orders currently displayed on the page
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
        this.orders = data.filter(order => order.status === 0); // Filter for available orders
        this.calculatePagination();
        this.updateDisplayedOrders();
        console.log('Available Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
        // this.generateDummyOrders(); // Fallback to dummy data on error
      }
    });
  }

  // generateDummyOrders() {
  //   console.log('Generating dummy available orders...');
  //   const dummyCount = Math.floor(Math.random() * 15) + 5; // 5-20 dummy orders
  //   this. = Array.from({ length: dummyCount }, (_, i) => ({
  //     id: i + 1,
  //     orderDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  //     status: 0, // Available
  //     paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Cash on Delivery',
  //     deliveryBoyId: null,
  //     userId: 'dummyUser' + Math.floor(Math.random() * 100),
  //     brandId: this.BrandID || 1, // Use actual BrandID or default
  //     orderDetails: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
  //       productId: j + 100,
  //       productName: `Dummy Product ${j + 1}`,
  //       price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
  //       quantity: Math.floor(Math.random() * 5) + 1
  //     }))
  //   }));
  //   this.calculatePagination();
  //   this.updateDisplayedOrders();
  // }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1;
    }
  }

  updateDisplayedOrders(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedOrders = this.orders.slice(start, end);
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
