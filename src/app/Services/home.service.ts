import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IBrand } from '../interfaces/IBrand';

environment

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/api/Brand/top`;
  constructor(private http: HttpClient) { }

  getTopBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.apiUrl);
  }
}
