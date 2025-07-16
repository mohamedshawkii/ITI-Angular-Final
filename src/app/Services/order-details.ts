import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class OrderDetails {
  _httpClient = inject(HttpClient);

  constructor() { }

  GetAll(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/OrderDetails/all`);
  }

}
