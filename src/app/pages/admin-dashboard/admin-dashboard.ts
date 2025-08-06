import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBare } from "./components/side-bare/side-bare";
import { Users } from "./components/users/users";
import { DashboardHomeComponent } from "./components/dashboard-home/dashboard-home";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, SideBare, Users, RouterOutlet, RouterLink, DashboardHomeComponent],
  templateUrl: 'admin-dashboard.html',
  styleUrl: 'admin-dashboard.scss'
})
export class AdminDashboardComponent {

}

