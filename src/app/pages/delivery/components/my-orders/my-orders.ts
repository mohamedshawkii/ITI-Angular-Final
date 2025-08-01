import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-my-orders',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss'
})
export class MyOrders implements OnInit {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
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
    this.GetMyOrders();
  }

  GetAvailable() {
    this._OrderService.MyOrders(this.DeliveryID).subscribe({
      next: (data: any[]) => {
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

  ReturningOrder(Order: IOrder): void {
    // Simulate API call
    console.log('Simulating ReturningOrder for order:', Order.id);
    // In a real app, you'd call this._OrderService.OrderUpdate(Order).subscribe(...)
    setTimeout(() => {
      console.log('Order marked for returning successfully (simulated).');
      this.GetMyOrders(); // Refresh data
    }, 500);
  }

  DeliveryUserHandingRequest(Order: IOrder): void {
    // Simulate API call
    console.log('Simulating DeliveryUserHandingRequest for order:', Order.id);
    // In a real app, you'd call this._OrderService.OrderUpdate(Order).subscribe(...)
    setTimeout(() => {
      console.log('Delivery handing request sent successfully (simulated).');
      this.GetMyOrders(); // Refresh data
    }, 500);
  }

  GiveUpOrder(orderId: number, DeliveryID: string): void {
    // Simulate API call
    console.log('Simulating GiveUpOrder for order:', orderId);
    // In a real app, you'd call this._OrderService.ReleaseOrder(orderId, DeliveryID).subscribe(...)
    setTimeout(() => {
      console.log('Order released successfully (simulated).');
      this.GetMyOrders(); // Refresh data
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
