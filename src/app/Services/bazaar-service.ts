import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBazaar } from '../interfaces/IBazaar';
import { IFeaturedBrand } from '../interfaces/IFeaturedBrand';
import { environment } from '../../environments/environments';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class BazaarService {
  constructor(private http: HttpClient, private auth: Auth) { }

  getAllBazaars(): Observable<IBazaar[]> {
    return this.http.get<IBazaar[]>(`${environment.apiUrl}/api/Bazaar/GetAllBazaars`);
  }
  getBazaarById(id: number): Observable<IBazaar> {
    return this.http.get<IBazaar>(`${environment.apiUrl}/api/Bazaar/GetBazaarById/${id}`);
  }

  getNextEvent(): Observable<IBazaar> {
    return this.http.get<IBazaar>(`${environment.apiUrl}/api/Bazaar/next-event`);
  }

  createBazaar(data: IBazaar): Observable<IBazaar> {
    return this.http.post<IBazaar>(`${environment.apiUrl}/api/Bazaar/CreateBazaar`, data);
  }

  updateBazaar(id: number, data: IBazaar): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/api/Bazaar/UpdateBazaar/${id}`, data);
  }

  deleteBazaar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/Bazaar/Delete/${id}`);
  }
  getBrandsForBazaar(bazaarId: number): Observable<IFeaturedBrand[]> {
    return this.http.get<IFeaturedBrand[]>(
      `${environment.apiUrl}/api/BazarBrand/${bazaarId}/brands`
    );
  }

  addBrandToBazaar(bazaarId: number, brandId: number): Observable<any> {
    const token = this.auth.getToken();
    return this.http.post(
      `${environment.apiUrl}/api/BazarBrand/AddBrandToBazar/${bazaarId}/${brandId}`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
