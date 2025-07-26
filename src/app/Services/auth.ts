import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterData, RegisterRequest } from '../pages/register/register';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  UserToken: BehaviorSubject<string> = new BehaviorSubject('');
  _httpClient = inject(HttpClient);
  _PLATFORM_ID = inject(PLATFORM_ID);
  _Router = inject(Router);

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token')) {
        this.UserToken.next(localStorage.getItem('token')!);
      }
    }
  }

  register(Info: RegisterRequest): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}/Account/Register`,
      Info
    );
  }

  Login(Info: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/Account/Login`, Info);
  }

  saveUser() {
    const token = localStorage.getItem('token')!;
    this.UserToken.next(token);
  }

  logOut() {
    localStorage.removeItem('token');
    this.UserToken.next('');
    this._Router.navigate(['/login']);
  }
//modified nahed
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getBrandIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return +payload['nameid'];
  }
}
