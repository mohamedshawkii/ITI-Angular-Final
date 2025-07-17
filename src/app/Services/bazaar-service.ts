import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INextEvent } from '../interfaces/inext-event';
import { Observable } from 'rxjs';
import { IBazaar } from '../interfaces/ibazaar';
import { IfeaturedBrand } from '../interfaces/ifeatured-brand';

@Injectable({
  providedIn: 'root',
})
export class BazaarService {
  private baseUrl = 'http://localhost:29962/api/Bazaar';
  constructor(private http: HttpClient) {}

  getAllBazaars(): Observable<IBazaar[]> {
    return this.http.get<IBazaar[]>(`${this.baseUrl}/GetAllBazaars`);
  }
  getBazaarById(id: number): Observable<IBazaar> {
    return this.http.get<IBazaar>(`${this.baseUrl}/GetBazaarById/${id}`);
  }

  getNextEvent(id: number): Observable<INextEvent> {
    return this.http.get<INextEvent>(`${this.baseUrl}/next-event/${id}`);
  }

  createBazaar(data: IBazaar): Observable<IBazaar> {
    return this.http.post<IBazaar>(`${this.baseUrl}/CreateBazaar`, data);
  }

  updateBazaar(id: number, data: IBazaar): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/UpdateBazaar/${id}`, data);
  }
  deleteBazaar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Delete/${id}`);
  }

  getBrandsForBazaar(bazaarId: number): Observable<IfeaturedBrand[]> {
    return this.http.get<IfeaturedBrand[]>(
      `http://localhost:29962/api/BazarBrand/${bazaarId}/brands`
    );
  }
}
