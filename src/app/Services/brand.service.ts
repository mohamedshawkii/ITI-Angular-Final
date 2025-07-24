import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iBrand } from './../interfaces/ibrand';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${environment.apiUrl}/Brand/all`);
  }

  CreateBrand(brand: iBrand): Observable<iBrand> {
    return this.http.post<iBrand>(`${environment.apiUrl}/Brand/add`, brand);
  }
  GetBrandById(id: number): Observable<iBrand> {
    return this.http.get<iBrand>(`${environment.apiUrl}/Brand/${id}`);
  }
}
