import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '@pages/register/register';
import { environment } from '@env/environments';
import { CartService } from '@services/cart-service';

export interface DecodedToken {
  [key: string]: unknown;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  exp?: number;
  iss?: string;
  aud?: string;
  jti?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  UserToken: BehaviorSubject<string> = new BehaviorSubject('');
  _httpClient = inject(HttpClient);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);
  currentUser: string | null = null;
  currentRole: string | null = null;
  _CartService = inject(CartService);
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.UserToken.next(token);
      }
    }
  }

  register(Info: RegisterRequest): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Account/Register`, Info);
  }

  Login(Info: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Account/Login`, Info);
  }

  saveUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.UserToken.next(token);
      try {
        const payload = token.split('.')[1];
        const decoded: DecodedToken = JSON.parse(atob(payload));
        this.currentUser = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? null;
        this.currentRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? null;
      } catch (error) {
        console.error("Invalid token format", error);
        this.currentUser = null;
        this.currentRole = null;
      }
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this._CartService.clearCart();
    this.UserToken.next('');
    this._Router.navigate(['/login']);

  }

  getDecodedToken(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const Decoded = jwtDecode<DecodedToken>(token);
      return Decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserID(): string | null {
    const decoded = this.getDecodedToken();
    const userId = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    if (Array.isArray(userId)) {
      return userId.join(',');
    }
    return userId ?? null;
  }
  getRole(): string[] {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roleClaim =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (Array.isArray(roleClaim)) {
        return roleClaim;
      } else if (typeof roleClaim === "string") {
        return [roleClaim];
      } else {
        return [];
      }
    } catch (e) {
      console.error("❌ Failed to decode token:", e);
      return [];
    }
  }

  hasRole(role: string): boolean {
    const userRole = this.getRole();
    if (Array.isArray(userRole)) {
      return userRole.includes(role);
    }
    return userRole === role;
  }

  hasBrand(): Observable<boolean> {
    const userId = this.getCurrentUserID();
    if (!userId) return new Observable(observer => observer.next(true));

    return this._httpClient.get<{ hasBrand: boolean }>(`${environment.apiUrl}/api/Brand/HasBrand/${userId}`)
      .pipe(map(res => res.hasBrand));
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }
}
