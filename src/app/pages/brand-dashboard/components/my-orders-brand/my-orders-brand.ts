import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { BrandService } from '../../../../Services/brand.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-my-orders-brand',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule
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
  UserID!: string;
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
        if (data && data.length > 0) {
          this.BrandID = data[0].id;
          this.GetInProgressOrders();
        } else {
          console.warn('No brand found for this user. Generating dummy in-progress orders.');
          // this.generateDummyOrders(); // Fallback to dummy data
        }
      },
      error: (error) => {
        console.error('Error fetching brand ID:', error);
        // this.generateDummyOrders(); // Fallback to dummy data on error
      }
    });
  }

  GetInProgressOrders() {
    this._OrderService.GetOrderByBrandId(this.BrandID).subscribe({
      next: (data: IOrder[]) => {
        this.orders = data.filter(order =>
          order.status === 1 || order.status === 2 || order.status === 4 ||
          order.status === 5 || order.status === 6 || order.status === 7
        );
        this.calculatePagination();
        this.updateDisplayedOrders();
        console.log('In-Progress Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching in-progress orders:', error);
        // this.generateDummyOrders(); // Fallback to dummy data on error
      }
    });
  }

  // generateDummyOrders() {
  //   console.log('Generating dummy in-progress orders...');
  //   const dummyCount = Math.floor(Math.random() * 20) + 5; // 5-25 dummy orders
  //   this.orders = Array.from({ length: dummyCount }, (_, i) => ({
  //     id: i + 1,
  //     orderDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  //     status: [1, 2, 4, 5, 6, 7][Math.floor(Math.random() * 6)], // Random in-progress status
  //     paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Cash on Delivery',
  //     deliveryBoyId: 'dummyDeliveryBoy' + Math.floor(Math.random() * 10),
  //     userId: 'dummyUser' + Math.floor(Math.random() * 100),
  //     brandId: this.BrandID || 1,
  //     orderDetails: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
  //       productId: j + 300,
  //       productName: `Dummy Product ${j + 1}`,
  //       price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
  //       quantity: Math.floor(Math.random() * 5) + 1
  //     }))
  //   }));
  //   this.calculatePagination();
  //   this.updateDisplayedOrders();
  // }

  HandOrder(order: IOrder): void {
    // Simulate API call
    console.log('Simulating HandOrder for order:', order.id);
    order.status = 1; // Set to OutForDelivery
    // In a real app, you'd call this._OrderService.OrderUpdate(order).subscribe(...)
    setTimeout(() => {
      console.log('Order handed for delivery successfully (simulated).');
      this.GetInProgressOrders(); // Refresh data
    }, 500);
  }

  ReceiveReturning(order: IOrder): void {
    // Simulate API call
    console.log('Simulating ReceiveReturning for order:', order.id);
    order.status = 3; // Set to Cancelled (or a specific 'Returned' status if available)
    // In a real app, you'd call this._OrderService.OrderUpdate(order).subscribe(...)
    setTimeout(() => {
      console.log('Order returned successfully (simulated).');
      this.GetInProgressOrders(); // Refresh data
    }, 500);
  }

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
