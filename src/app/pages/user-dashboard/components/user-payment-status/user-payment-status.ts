import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '@interfaces/IOrder';
import { Auth } from '@services/auth';
import { OrderService } from '@services/order-service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-payment-status',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './user-payment-status.html',
  styleUrl: './user-payment-status.scss'
})
export class UserPaymentStatus implements OnInit {
  orders: IOrder[] = [];
  UserId!: string;
  totalPayment: number = 0;
  totalPendingPayment: number = 0;
  Orders: number = 0;
  RefundedOrders: number = 0;
  CancelledNoRefund: number = 0;
  CompletedOrders: number = 0;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);
  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetOrdersHistory(this.UserId);

  }

  GetOrdersHistory(UserId: string) {
    this._OrderService.GetMadeOrders(UserId).subscribe({
      next: (data: IOrder[]) => {
        this.orders = data;

        console.log('Available Orders:', this.orders);

        this.CalculateOrders(data);
        this.CalculateUserPayment(data);
        this.CalculatePendingPayment(data);
        this.RefundedOrdersNumber(data);
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  //Orders Numbers
  CalculateOrders(order: IOrder[]): void {
    this.Orders = order.length;
  }

  //my wallet, money that i paid
  CalculateUserPayment(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      this.totalPayment += item.totalAmount;
    });
  }

  //pending money that is returning
  CalculatePendingPayment(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 3) {
        if (item.payment?.paymentStatus == 'Refunded') {
          this.totalPendingPayment += item.totalAmount;
        }
      }
    });
  }

  //pending money that is returning
  RefundedOrdersNumber(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 3) {
        if (item.payment?.paymentStatus == 'Refunded') {
          this.RefundedOrders += 1;
        } else {
          this.CancelledNoRefund += 1;
        }
      }
      if (item.status === 2 || item.status === 9) {
        this.CompletedOrders += 1;
      }
    });
  }


}
