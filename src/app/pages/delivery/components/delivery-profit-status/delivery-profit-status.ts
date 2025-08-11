import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '@interfaces/IOrder';
import { Auth } from '@services/auth';
import { OrderService } from '@services/order-service';

@Component({
  selector: 'app-delivery-profit-status',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './delivery-profit-status.html',
  styleUrl: './delivery-profit-status.scss'
})
export class DeliveryProfitStatus implements OnInit {
  orders: IOrder[] = [];
  OrdersInProgress: number = 0;
  UserId!: string;
  Orders: number = 0;
  DeliveredOrders: number = 0;
  CancelledOrders: number = 0;
  TotalProfit: number = 0;
  PendingProfitFromCashOnDelivery: number = 0;
  TotalProfitFromCashOnDelivery: number = 0;

  _OrderService = inject(OrderService);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.UserId = this._AuthService.getCurrentUserID()!;
    this.GetOrdersHistory(this.UserId);
  }

  GetOrdersHistory(UserId: string) {
    this._OrderService.MyOrders(UserId).subscribe({
      next: (data: IOrder[]) => {
        this.orders = data;

        console.log('Available Orders:', this.orders);

        this.CalculateOrders(this.orders);
        this.CalculateDeliveredOrders(this.orders);
        this.CalculateProfit(this.orders);
        this.PendingProfitAsCash(this.orders);
        this.GetCashTotalAmount(this.orders);
        this.OrdersOnProgress(this.orders)
      },
      error: (error) => {
        console.error('Error fetching available orders:', error);
      }
    });
  }

  //Orders Numbers carried overall
  CalculateOrders(order: IOrder[]): void {
    this.Orders = order.length;
  }

  //delivered orders
  CalculateDeliveredOrders(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 2 || item.status === 9) {
        this.DeliveredOrders += 1;
      }
      //cancelled orders
      if (item.status === 3) {
        this.CancelledOrders += 1;
      }
      //if returned order should also counted as order delivered like new order
    });
  }

  // this is the money that i got from the orders that i delivered
  // 5% per order then that should calculated once per order
  // the order calculated only when it is delivered
  // if user returned it it should set set IsCalculated to false again
  // so that it can be calculated again by returning the order to brand and set the status to 3 canncelled
  CalculateProfit(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 2 && !item.isDeliveryFeesCollected && item.paymentMethod === 'Visa/MasterCard') {
        //update the order
        item.isDeliveryFeesCollected = true;
        this._OrderService.OrderUpdate(item).subscribe({
          next: () => {
            // console.log('Order updated successfully:', data);
          },
          error: (error) => {
            console.error('Error updating order:', error);
          }
        });
      }

      if (item.status === 2 && item.isDeliveryFeesCollected && item.paymentMethod === 'Visa/MasterCard') {
        this.TotalProfit += item.totalAmount * 0.05;
      }
    });
  }



  // profit from Chash on Delivery that i delivered to brand
  // this should be calculated after delivery to the brand
  GetCashTotalAmount(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 9 && !item.isDeliveryFeesCollected && item.paymentMethod === 'Cash on Delivery' && item.isCashDeliveredToBrand) {
        this.TotalProfitFromCashOnDelivery += item.totalAmount * 0.10;
        //update the order
        item.isDeliveryFeesCollected = true;
        this._OrderService.OrderUpdate(item).subscribe({
          next: () => {
            // console.log('Order updated successfully:', data);
          },
          error: (error) => {
            console.error('Error updating order:', error);
          }
        });
      }

      if (item.status === 9 && item.isDeliveryFeesCollected && item.paymentMethod === 'Cash on Delivery' && item.isCashDeliveredToBrand) {
        this.TotalProfitFromCashOnDelivery += item.totalAmount * 0.10;
      }
    });
  }

  //Pending profit
  PendingProfitAsCash(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if ((item.status === 8 || item.status === 10) && !item.isDeliveryFeesCollected && item.paymentMethod === 'Cash on Delivery' && !item.isCashDeliveredToBrand) {
        //cash on delivery icrease delivery profit by 5%
        this.PendingProfitFromCashOnDelivery += item.totalAmount * 0.10;
      }
    })
  }

  OrdersOnProgress(order: IOrder[] = []): void {
    this.OrdersInProgress = order.filter(
      (item) => item?.status != null && ![2, 9, 3].includes(item.status)
    ).length;
  }
}
