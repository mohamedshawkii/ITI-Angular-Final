import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '@interfaces/IOrder';
import { Auth } from '@services/auth';
import { BrandService } from '@services/brand.service';
import { OrderService } from '@services/order-service';

@Component({
  selector: 'app-brand-payment-status',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './brand-payment-status.html',
  styleUrl: './brand-payment-status.scss'
})
export class BrandPaymentStatus implements OnInit {
  orders: IOrder[] = [];
  UserId!: string;
  Orders: number = 0;
  CancelledOrders: number = 0;
  DeliveredOrders: number = 0;
  TotalProfit: number = 0;
  DeliveryFees: number = 0;
  TotalNetProfit: number = 0;
  BrandID!: number;
  BetnaFees: number = 0;
  DeliveredCashOrders: number = 0;
  OrdersInProgress: number = 0;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);
  _BrandService = inject(BrandService);

  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetBrandId(this.UserId);
  }

  GetOrdersHistory(BrandID: number) {
    this._OrderService.GetOrderByBrandId(BrandID).subscribe({
      next: (data: IOrder[]) => {
        this.orders = data;

        // console.log('Available Orders:', this.orders);

        this.CalculateOrders(this.orders);
        this.CalculateTotalProfit(this.orders);
        this.CalculateSystemFees(this.orders);
        this.CalculateNetProfit();
        this.OrdersOnProgress(this.orders)

      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  GetBrandId(UserID: string) {
    this._BrandService.GetBrandByUserId(UserID).subscribe({
      next: (data) => {
        this.BrandID = data[0].id;
        // console.log(data);
        this.GetOrdersHistory(this.BrandID);
      },
      error: (error) => {
        console.error('Error fetching available brands:', error);
      }
    });
  }

  //calculate number of orders delivered 
  CalculateOrders(order: IOrder[]): void {
    this.Orders = order.length;
    order.map((item: IOrder) => {
      if (item.status === 3) {
        this.CancelledOrders++;
      }
      if (item.status === 2) {
        this.DeliveredOrders++;
      }
      if (item.status === 9) {
        this.DeliveredCashOrders++;
      }
    })
  }

  // calculate the total profitt
  CalculateTotalProfit(order: IOrder[]): void {
    order.map((item: IOrder) => {
      if (item.status === 9 || item.status === 2) {
        this.TotalProfit += item.totalAmount;
      }
    })
  }

  //calculate the share of the System //10%
  //calculate the share of the delivery for online payment //5% and 5% more if on cash
  CalculateSystemFees(order: IOrder[]): void {
    order.map((item: IOrder) => {
      //online payment
      if (item.status === 2 && item.isDeliveryFeesCollected && item.paymentMethod === 'Visa/MasterCard') {
        this.DeliveryFees += item.totalAmount * 0.05;
      }

      if (item.status === 9 && item.isDeliveryFeesCollected && item.paymentMethod === 'Cash on Delivery') {
        this.DeliveryFees += item.totalAmount * 0.10;
      }

      if (item.status === 9 || item.status === 2) {
        this.BetnaFees = item.totalAmount * 0.20;
      }
    })
  }
  // calculate the the net profit
  CalculateNetProfit(): void {
    const totalFees = (this.BetnaFees || 0) + (this.DeliveryFees || 0);
    this.TotalNetProfit = (this.TotalProfit || 0) - totalFees;
  }
  OrdersOnProgress(order: IOrder[] = []): void {
    this.OrdersInProgress = order.filter(
      (item) => item?.status != null && ![2, 9, 3].includes(item.status)
    ).length;
  }
}
