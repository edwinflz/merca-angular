import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Category } from '@core/models/categories.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private url = `${environment.url_api}/api/categories`;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(this.url).pipe(
      map((response: any) => response.data as Category[])
    );
  }

}
