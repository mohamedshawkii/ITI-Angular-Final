import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environments';
import { IProduct } from '@interfaces/IProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _httpClient = inject(HttpClient);
  constructor() { }

  GetAllProducts(BrandID: number): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${environment.apiUrl}/api/Product/all/${BrandID}`);
  }
  CreateProduct(formData: FormData): Observable<IProduct> {
    return this._httpClient.post<IProduct>(`${environment.apiUrl}/api/Product/add`, formData);
  }
  GetProductById(ProductID: number): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${environment.apiUrl}/api/Product/${ProductID}`);
  }
  UpdateProduct(productId: number, formData: FormData): Observable<IProduct> {
    return this._httpClient.put<IProduct>(`${environment.apiUrl}/api/Product/update/${productId}`, formData);
  }
}
