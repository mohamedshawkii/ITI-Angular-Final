import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iBrand } from './../interfaces/ibrand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = 'http://localhost:5066/api/Brand';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${this.baseUrl}/all`);
  }
}
