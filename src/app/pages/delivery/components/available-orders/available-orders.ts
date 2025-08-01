import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order-service';
import { IOrder } from '../../../../interfaces/IOrder';
import { Auth } from '../../../../Services/auth';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-available-orders',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule
  templateUrl: './available-orders.html',
  styleUrl: './available-orders.scss'
})
export class AvailableOrders implements OnInit {
  orders: IOrder[] = [];
  displayedOrders: IOrder[] = [];
  CurrActiveOrders: IOrder[] = [];
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
    this.ActiveOrders();
  }

  get hasReachedOrderLimit(): boolean {
    return (this.CurrActiveOrders?.length ?? 0) >= 2; // Changed to >= 2 for clarity
  }

  ActiveOrders() {
    if (this.DeliveryID) {
      this._OrderService.GetActiveOrders(this.DeliveryID).subscribe({
        next: (data: IOrder[]) => {
          this.CurrActiveOrders = data;
          console.log('Active Orders for Delivery Boy:', data);
        },
        error: (error) => {
          console.error('Error fetching active orders:', error);
          // this.CurrActiveOrders = this.generateDummyActiveOrders(); // Fallback to dummy
        }
      });
    } else {
      // this.CurrActiveOrders = this.generateDummyActiveOrders(); // Fallback if DeliveryID is null/undefined
    }
  }

  // generateDummyActiveOrders(): IOrder[] {
  //   const count = Math.floor(Math.random() * 3); // 0, 1, or 2 active orders
  //   return Array.from({ length: count }, (_, i) => ({
  //     id: i + 1000,
  //     orderDate: new Date().toISOString(),
  //     status: 1, // OutForDelivery
  //     paymentMethod: 'Cash',
  //     deliveryBoyId: this.DeliveryID || 'dummyDeliveryBoy',
  //     userId: 'dummyUser' + Math.floor(Math.random() * 100),
  //     brandId: 1,
  //     orderDetails: [{ productId: 1, productName: 'Dummy Item', price: 10, quantity: 1 }]
  //   }));
  // }

  GetAvailable() {
    this._OrderService.AvailableOrders().subscribe({
      next: (data: IOrder[]) => {
        this.orders = data.filter(order => order.status === 0);
        this.calculatePagination();
        this.updateDisplayedOrders();
        console.log('Available Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
        // this.generateDummyAvailableOrders(); // Fallback to dummy data
      }
    });
  }

  // generateDummyAvailableOrders() {
  //   console.log('Generating dummy available orders...');
  //   const dummyCount = Math.floor(Math.random() * 15) + 5; // 5-20 dummy orders
  //   this.orders = Array.from({ length: dummyCount }, (_, i) => ({
  //     id: i + 1,
  //     orderDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  //     status: 0, // Available
  //     paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Cash on Delivery',
  //     deliveryBoyId: null,
  //     userId: 'dummyUser' + Math.floor(Math.random() * 100),
  //     brandId: Math.floor(Math.random() * 5) + 1,
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

  TakeOrder(Order: IOrder): void {
    if (this.hasReachedOrderLimit) {
      alert('You have reached your active order limit (2 orders). Please complete existing orders before taking new ones.');
      return;
    }

    // Simulate API call
    console.log('Simulating TakeOrder for order:', Order.id);
    // In a real app, you'd call this._OrderService.AssignOrder(Order.id, this.DeliveryID).subscribe(...)
    setTimeout(() => {
      console.log('Order taken successfully (simulated).');
      // Remove from available and add to active (simulated)
      this.orders = this.orders.filter(o => o.id !== Order.id);
      this.CurrActiveOrders.push({ ...Order, status: 4 }); // Simulate status change
      this.calculatePagination();
      this.updateDisplayedOrders();
      alert(`Order ${Order.id} has been taken!`);
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
