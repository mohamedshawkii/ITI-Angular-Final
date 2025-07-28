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
    return this.http.get<iBrand[]>(`${environment.apiUrl}/api/Brand/all`);
  }

  CreateBrand(formData: FormData): Observable<any> {
    return this.http.post<iBrand>(`${environment.apiUrl}/api/Brand/add`, formData);
  }
  GetBrandById(id: number): Observable<iBrand> {
    return this.http.get<iBrand>(`${environment.apiUrl}/api/Brand/${id}`);
  }
}
