import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iBrand } from '../interfaces/iBrand';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IBazaar } from '../interfaces/ibazaar';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${environment.apiUrl}/api/Brand/all`);
  }

  CreateBrand(formData: FormData): Observable<any> {
    return this.http.post<iBrand>(`${environment.apiUrl}/api/Brand/add`, formData);
  }
  GetBrandById(id: number): Observable<iBrand> {
    return this.http.get<iBrand>(`${environment.apiUrl}/api/Brand/${id}`);
  }
  GetBrandByUserId(userId: string): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${environment.apiUrl}/api/Brand/user/${userId}`);
  }
  GetRegisteredBrandInBazar(brandId: number): Observable<IBazaar[]> { return this.http.get<IBazaar[]>(`${environment.apiUrl}/api/BazarBrand/brand/${brandId}/bazars`); }
  GetBrandByBazarId(bazarId: number): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${environment.apiUrl}/api/BazarBrand/${bazarId}/brands`);
  }
}
