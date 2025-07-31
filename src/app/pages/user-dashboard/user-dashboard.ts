import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBareUser } from './components/side-bare-user/side-bare-user';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, SideBareUser, RouterOutlet, RouterLink],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss'
})
export class UserDashboardComponent {

}

