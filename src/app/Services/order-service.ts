import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environments';
import { IOrder } from '@interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _httpClient = inject(HttpClient)

  constructor() { }
  // order to a delivery boy
  AssignOrder(orderId: number, deliveryBoyId: string): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/api/DeliveryOrders/AssignOrderToDelivery/${orderId}/${deliveryBoyId}`, { orderId, deliveryBoyId });
  }
  MyOrders(deliveryID: string): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/DeliveryOrders/MyOrders/${deliveryID}`);
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
  CreateOrder(order: IOrder): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/DeliveryOrders/Delivered`, order);
  }
  CancelOrder(): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/DeliveryOrders/Cancel`, {});
  }

  GetActiveOrders(deliveryId: string): Observable<IOrder[]> {
    return this._httpClient.get<IOrder[]>(`${environment.apiUrl}/api/DeliveryOrders/delivery/${deliveryId}/active-orders`);
  }

  // Get all orders made by the current user
  CreateUserOrder(order: IOrder): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/Order/CreateOrder`, order);
  }
  GetMadeOrders(userId: string): Observable<IOrder[]> {
    return this._httpClient.get<IOrder[]>(`${environment.apiUrl}/api/Order/UserOrders/${userId}`);
  }

  OrderUpdate(order: IOrder): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/api/Order/update`, order);
  }
  GetOrderByBrandId(BrandId: number): Observable<IOrder[]> {
    return this._httpClient.get<IOrder[]>(`${environment.apiUrl}/api/Order/Brand/${BrandId}`);
  }
}
