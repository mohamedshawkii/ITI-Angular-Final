import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iBrand } from './../interfaces/ibrand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  createBrand(newBrand: { name: string; description: string; address: string; image: string; categoryID: number; ownerID: string; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5066/api/Brand';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<iBrand[]> {
    return this.http.get<iBrand[]>(`${this.baseUrl}/all`);
  }
}
