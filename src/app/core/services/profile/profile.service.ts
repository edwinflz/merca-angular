import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '../tokens/token.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = `${environment.url_api}/api/compradores`;


  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  userHasProfileShopper() {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}`);
  }

}
