import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { IProduct } from '../interfaces/IProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _httpClient = inject(HttpClient);
  constructor() { }

  GetAllProducts(BrandID: number): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${environment.apiUrl}/Product/all/${BrandID}`);
  }
  CreateProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient.post<IProduct>(`${environment.apiUrl}/Product/add`, product);
  }
}
