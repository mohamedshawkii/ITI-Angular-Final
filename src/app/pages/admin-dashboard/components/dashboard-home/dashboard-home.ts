import { IUser } from '../../../../interfaces/IUser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'dashboard-home.html',
  styleUrls: ['dashboard-home.scss']
})
export class DashboardHomeComponent {
  // هنا يمكنك جلب الإحصائيات الحقيقية من الـ Services الخاصة بك

    users: IUser[] = [];
      displayedUsers: IUser[] = [];

  stats = {
    totalUsers: 1250,
    newSignups: 78,
    activeBazars: 1,
    totalRevenue: 150
  };
}