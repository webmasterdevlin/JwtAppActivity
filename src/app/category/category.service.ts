import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Category } from './category';

const API_URL = "http://localhost:5000/api/category/";

@Injectable()
export class CategoryService {

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(API_URL);
  }
}
