import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopBrand } from '../interfaces/top-Brand';
import { environment } from '../../environments/environments';

environment

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/api/Brand/top`;
  constructor(private http: HttpClient) { }

  getTopBrands(): Observable<TopBrand[]> {
    return this.http.get<TopBrand[]>(this.apiUrl);
  }
}
