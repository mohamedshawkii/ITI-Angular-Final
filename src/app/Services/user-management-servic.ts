import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementServic {
  _httpClient = inject(HttpClient)
  Url: string = ''

  constructor() { }

  GetAll() : Observable<any>{
    return this._httpClient.get(`${this.Url}/all`)
  }
}
