import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  userRole: string | string[] | null = null;
  isLoggedIn: boolean = false;
  cartCount: number = 0;
  isMobileMenuOpen = false;

  constructor(public authService: Auth, private cartService: CartService) {}

  ngOnInit() {
    // اشترك مع UserToken
    this.authService.UserToken.subscribe((token) => {
      this.isLoggedIn = !!token;
      
      if (this.isLoggedIn) {
        const role = this.authService.getRole();
        this.userRole = role;
      } else {
        this.userRole = null;
      }
    });

    // عدد المنتجات في الكارت (اختياري حسب ما عندك في CartService)
    const products = this.cartService.getCartItems();
    this.cartCount = products.length;
  }

  showFor(roles: string[]): boolean {
    const role = this.userRole;
    if (!role) return false;

    if (Array.isArray(role)) {
      return roles.some((r) => role.includes(r));
    }

    return roles.includes(role);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.userRole = null;
  }
}
