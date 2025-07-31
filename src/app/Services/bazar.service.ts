import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class BazarService {
  _httpClient = inject(HttpClient);
  constructor() { }

  getBazar(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/Bazar/GetProducts`);
  }
  postBazar(Bazar: any, p0?: { responseType: "json"; }): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Bazaar/CreateBazaar`, Bazar);
  }
  
}
