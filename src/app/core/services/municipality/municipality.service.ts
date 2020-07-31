import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Municipality } from '../../models/municipalities.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private url = `${environment.url_api}/api/municipalities`;

  constructor(private http: HttpClient) { }

  getAllMunicipalities(): Observable<Municipality[]> {
    return this.http.get(this.url).pipe(
      map((response: any) => response.data as Municipality[])
    );
  }
}
