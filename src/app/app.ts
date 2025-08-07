import { ChatbotComponent } from './interfaces/chatbot/chatbot';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule,ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  hideFooter = false;

  constructor() {
    // Hide footer on specific routes
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin') || currentPath.includes('/delivery')) {
      this.hideFooter = true;
    }
  }
}