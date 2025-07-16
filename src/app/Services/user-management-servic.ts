import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServic {
  _httpClient = inject(HttpClient)
  Url: string = ''

  constructor() { }

  GetAll(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/Admin/AllUsers`)
  }

  Promotion(userId: number): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/Admin/promotion/${userId}`, {})
  }
}
