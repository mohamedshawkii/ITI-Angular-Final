import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@services/auth';
import { CartService } from '@services/cart-service';
import { IProduct } from '@interfaces/IProduct';
import { BrandService } from '@services/brand.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  BrandId!: number;
  userRole!: string[];
  isLoggedIn: boolean = false;
  itemCount: number = 0;
  isMobileMenuOpen = false;

  _BrandService = inject(BrandService);

  constructor(public authService: Auth, private cartService: CartService) { }
  ngOnInit() {
    this.authService.UserToken.subscribe((token) => {
      this.isLoggedIn = !!token;

      if (this.isLoggedIn) {
        this.userRole = this.authService.getRole();
        if (this.userRole.includes('BrandOwner')) {
          this.GetBrandByUserId(this.authService.getCurrentUserID()!);
        }
      } else {
        this.userRole = [];
      }
    });

    this.cartService.cart$.subscribe((cartItems: IProduct[]) => {
      this.itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    });
  }

  GetBrandByUserId(UserId: string) {
    this._BrandService.GetBrandByUserId(UserId).subscribe({
      next: (data) => {
        this.BrandId = data[0].id
      },
      error: (error) => {
        // console.error('Error fetching available brands:', error);
      }
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
