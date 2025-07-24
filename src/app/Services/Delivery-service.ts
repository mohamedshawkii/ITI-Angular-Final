import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _httpClient = inject(HttpClient)

  constructor() { }

  AssignOrder(orderId: number, deliveryBoyId: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/api/DeliveryOrders/AssignOrderToDelivery/${orderId}/${deliveryBoyId}`, { orderId, deliveryBoyId });
  }
  MyOrders(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/DeliveryOrders/GetMyAssignedOrders`);
  }
  ReleaseOrder(orderId: number, deliveryBoyId: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/api/DeliveryOrders/Release/${orderId}/${deliveryBoyId}`, { orderId, deliveryBoyId });
  }
  DeliverdOrder(orderId: number, deliveryBoyId: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/api/DeliveryOrders/Deliver/${orderId}/${deliveryBoyId}`, { orderId, deliveryBoyId });
  }
  AvailableOrders(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/DeliveryOrders/Available`);
  }
  OrdersHistory(DeliveryID: string): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/DeliveryOrders/MyHistory/${DeliveryID}`);
  }
  CreateOrder(order: any): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/DeliveryOrders/Delivered`, order);
  }
  CancelOrder(): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/DeliveryOrders/Cancel`, {});
  }

}
