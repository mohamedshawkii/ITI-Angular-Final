import { inject, Injectable } from '@angular/core';
import { IReview } from '../interfaces/IReview';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  _httpClient = inject(HttpClient);
  constructor() { }
  AddReview(review: IReview): Observable<IReview> {
    return this._httpClient.post<IReview>(`${environment.apiUrl}/api/Review/add`, review);
  }
  BrandReviews(brandId: number): Observable<IReview[]> {
    return this._httpClient.get<IReview[]>(`${environment.apiUrl}/api/Review/${brandId}/reviews`);
  }
}