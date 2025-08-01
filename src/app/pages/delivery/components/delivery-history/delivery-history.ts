import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-delivery-history',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule
  templateUrl: './delivery-history.html',
  styleUrl: './delivery-history.scss'
})
export class DeliveryHistory implements OnInit {
  DeliveryID!: string;
  orders: IOrder[] = [];
  displayedOrders: IOrder[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.DeliveryID = this._AuthService.getCurrentUserID()!;
    this.GetOrdersHistory();
  }

  GetOrdersHistory() {
    if (this.DeliveryID) {
      this._OrderService.GetMadeOrders(this.DeliveryID).subscribe({
        next: (data: IOrder[]) => {
          this.orders = data.filter(order => order.status === 2 || order.status === 3); // Delivered or Cancelled
          this.calculatePagination();
          this.updateDisplayedOrders();
          console.log('Delivery History Orders:', this.orders);
        },
        error: (error) => {
          console.error('Error fetching delivery history:', error);
          // this.generateDummyHistory(); // Fallback to dummy data
        }
      });
    } else {
      // this.generateDummyHistory(); // Fallback if DeliveryID is null/undefined
    }
  }

  // generateDummyHistory() {
  //   console.log('Generating dummy delivery history...');
  //   const dummyCount = Math.floor(Math.random() * 25) + 10; // 10-35 dummy orders
  //   this.orders = Array.from({ length: dummyCount }, (_, i) => ({
  //     id: i + 1,
  //     orderDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  //     status: Math.random() > 0.5 ? 2 : 3, // 50% Delivered, 50% Cancelled
  //     paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Cash on Delivery',
  //     deliveryBoyId: this.DeliveryID || 'dummyDeliveryBoy',
  //     userId: 'dummyUser' + Math.floor(Math.random() * 100),
  //     brandId: Math.floor(Math.random() * 5) + 1,
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
