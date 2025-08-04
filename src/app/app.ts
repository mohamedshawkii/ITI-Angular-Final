import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Betna - Home Brands Marketplace';

  currentRoute = '';
  hideFooterHeaderRoutes = ['/admin', '/delivery', '/customerDashboard', '/brandDashboard'];
  hideFooter = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.hideFooter = this.hideFooterHeaderRoutes.some(prefix =>
          this.currentRoute.startsWith(prefix)
        );
      }
    });
  }
}