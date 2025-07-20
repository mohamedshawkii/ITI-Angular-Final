import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IOrder } from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _httpClient = inject(HttpClient);

  createOrder(order: IOrder): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/Order/CreateOrder`, { order });
  }

}
