import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand } from '@interfaces/IBrand'; 
import { environment } from '@env/environments'; 
import { IBazaar } from '@interfaces/IBazaar'; 

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${environment.apiUrl}/api/Brand/all`);
  }

  CreateBrand(formData: FormData): Observable<any> {
    return this.http.post<IBrand>(
      `${environment.apiUrl}/api/Brand/add`,
      formData
    );
  }
  GetBrandById(id: number): Observable<IBrand> {
    return this.http.get<IBrand>(`${environment.apiUrl}/api/Brand/${id}`);
  }
  GetBrandByUserId(userId: string): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(
      `${environment.apiUrl}/api/Brand/user/${userId}`
    );
  }

  //nahed
  updateBrand(formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/Brand/update`, formData);
  }
  GetRegisteredBrandInBazar(brandId: number): Observable<IBazaar[]> { return this.http.get<IBazaar[]>(`${environment.apiUrl}/api/BazarBrand/brand/${brandId}/bazars`); }
  GetBrandByBazarId(bazarId: number): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${environment.apiUrl}/api/BazarBrand/${bazarId}/brands`);
  }
}
