import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../pages/register/register';
import { environment } from '../../environments/environments';

export interface DecodedToken {
  nameid: string;
  email: string;
  role: string | string[];
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  UserToken: BehaviorSubject<string> = new BehaviorSubject('');
  _httpClient = inject(HttpClient);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);
  public currentUser: any;
  public currentRole: any;

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

    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    this.currentUser = decoded;
    this.currentRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
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
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  // ✅ قراءة الدور
getRole(): string | null {
  const decoded = this.getDecodedToken();
  const role = decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
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
