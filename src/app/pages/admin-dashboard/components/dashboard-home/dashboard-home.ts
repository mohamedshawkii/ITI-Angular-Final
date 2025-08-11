import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '@services/auth';
import { OrderService } from '@services/order-service';
import { IOrder } from '@interfaces/IOrder';
import { UserManagementServic } from '@services/user-management-servic';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'dashboard-home.html',
  styleUrls: ['dashboard-home.scss']
})
export class DashboardHomeComponent implements OnInit {
  orders!: IOrder[];
  UserId!: string;
  TotalRevenue: number = 0;
  UsersCount: number = 0;
  DeliveredOrders: number = 0;
  OrdersInProgress: number = 0;


  _OrderService = inject(OrderService);
  _userManagement = inject(UserManagementServic);
  _AuthService = inject(Auth);

  constructor() { }

  ngOnInit(): void {
    this.GetAllOrders();
    this.GetAllUser();
  }

  GetAllUser(): void {
    this._userManagement.GetAll().subscribe({
      next: (value) => {
        this.UsersCount = value.length
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetAllOrders(): void {
    this._OrderService.GetAllOrders().subscribe({
      next: (value) => {
        this.orders = value
        // console.log(this.orders);
        this.GetTotalRevenue(this.orders);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  GetTotalRevenue(order: IOrder[]): void {
    order.forEach((item: IOrder) => {
      if (item.status === 9 && item.isDeliveryFeesCollected && item.paymentMethod === 'Cash on Delivery' && item.isCashDeliveredToBrand) {
        this.TotalRevenue += item.totalAmount * 0.20;
        this.DeliveredOrders += 1;
      }
      if (item.status === 2 && item.isDeliveryFeesCollected && item.paymentMethod === 'Visa/MasterCard') {
        this.TotalRevenue += item.totalAmount * 0.20;
        this.DeliveredOrders += 1;
      }
    });
  }

}