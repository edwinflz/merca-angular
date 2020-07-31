import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '../tokens/token.service';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private url = `${environment.url_api}/api/business`;


  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  userHasProfileSalesman() {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}`);
  }
}
