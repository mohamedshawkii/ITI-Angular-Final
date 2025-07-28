import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  _httpClient = inject(HttpClient);

  GetCategories(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/Category/all`);
  }
}
