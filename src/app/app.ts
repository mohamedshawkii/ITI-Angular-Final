import { ChatbotComponent } from '@pages/chatbot/chatbot';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  hideFooter = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    // Subscribe to router events to update footer visibility on route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateFooterVisibility(event.url);
      });

    // Initial check for current route
    this.updateFooterVisibility(this.router.url);
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateFooterVisibility(currentPath: string) {
    if (currentPath.includes('/admin') ||
      currentPath.includes('/delivery') ||
      currentPath.includes('/brandDashboard') ||
      currentPath.includes('/customerDashboard')) {
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }
  }
}