import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  UserToken: BehaviorSubject<string> = new BehaviorSubject('');
  _httpClient = inject(HttpClient)
  _PLATFORM_ID = inject(PLATFORM_ID)
  _Router = inject(Router)

  constructor() {

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem("token")) {
        this.UserToken.next(localStorage.getItem("token")!)
      }
    }

  }

  register(Info: any): Observable<any> {
    return this._httpClient.post(`https://localhost:7158/api/Account/Register`, Info);
  }

  Login(Info: any): Observable<any> {
    return this._httpClient.post(`https://localhost:7158/api/Account/Login`, Info);
  }

  saveUser() {
    const token = localStorage.getItem("token")!;
    this.UserToken.next(token)
  }

  logOut() {
    localStorage.removeItem("token")
    this.UserToken.next('')
    this._Router.navigate(['/login'])
  }

}
