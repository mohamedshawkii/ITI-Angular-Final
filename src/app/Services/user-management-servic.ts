import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServic {
  _httpClient = inject(HttpClient)

  constructor() { }

  GetAll(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/Admin/AllUsers`)
  }
  Promotion(userId: string): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Admin/promotion/${userId}`, {})
  }
  Demotion(userId: string): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Admin/demotion/${userId}`, {})
  }
  DeleteUser(userId: string): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/api/Admin/${userId}`)
  }
}
