import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  cartItems: IProduct[] = [];
  cartCount = 0;

  authService = inject(Auth);
  router = inject(Router);
  _CartService = inject(CartService);

  ngOnInit() {
    this._CartService.cart$.subscribe(items => {
      this.cartCount = items.length;
    });
  }


  get isLoggedIn(): boolean {
    return !!this.authService.UserToken.value;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logOut() {
    this.authService.logOut();
  }
}

