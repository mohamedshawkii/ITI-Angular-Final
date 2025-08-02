import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { CartService } from '../../Services/cart-service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  userRole!: string[];
  isLoggedIn: boolean = false;
  itemCount: number = 0;
  isMobileMenuOpen = false;

  constructor(public authService: Auth, private cartService: CartService) { }
  ngOnInit() {
    this.authService.UserToken.subscribe((token) => {
      this.isLoggedIn = !!token;

      if (this.isLoggedIn) {
        this.userRole = this.authService.getRole();
        // console.log('Roles:', this.userRole);
      } else {
        this.userRole = [];
      }
    });

    this.cartService.cart$.subscribe((cartItems: IProduct[]) => {
      this.itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    });
  }

  hasAnyRole(rolesToCheck: string[], userRoles: string[]): boolean {
    return rolesToCheck.some(role => userRoles.includes(role));
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
  }
}
