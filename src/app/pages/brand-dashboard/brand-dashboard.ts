import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBareBrand } from './components/side-bare-brand/side-bare-brand'; 

@Component({
  selector: 'app-brand-dashboard',
  standalone: true,
  imports: [CommonModule, SideBareBrand, RouterOutlet, RouterLink],
  templateUrl: './brand-dashboard.html',
  styleUrl: './brand-dashboard.scss'
})
export class BrandDashboardComponent {

}

