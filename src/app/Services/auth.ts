import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../pages/register/register';
import { environment } from '../../environments/environments';

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
    this.UserToken.next('');
    this._Router.navigate(['/login']);

  }
  // ✅ فك التوكن
  getDecodedToken(): DecodedToken | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const Decoded = jwtDecode<DecodedToken>(token);
      // console.log('Decoding token:', Decoded);
      return Decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
//modified nahed
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getBrandIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

  getCurrentUserID(): string | null {
    const decoded = this.getDecodedToken();
    const userId = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    console.log('Decoding token userId:', userId);
    if (Array.isArray(userId)) {
      return userId.join(',');
    }
    return userId ?? null;
  }

  // ✅ قراءة الدور
  getRole(): string | null {
    const decoded = this.getDecodedToken();
    const role = decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // console.log('Decoding token role:', role);
    if (Array.isArray(role)) {
      return role.join(',');
    }
    return role ?? null;
  }

  // ✅ التحقق من دور معين
  hasRole(role: string): boolean {
    const userRole = this.getRole();
    if (Array.isArray(userRole)) {
      return userRole.includes(role);
    }
    return userRole === role;
  }

  // استخدام جاهز: هل المستخدم Admin؟
  isAdmin(): boolean {
    return this.hasRole('Admin');
  }
}
