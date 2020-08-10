import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from '../tokens/token.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = `${environment.url_api}/api/shoppers`;


  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  userHasProfileShopper() {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}`);
  }

  createShopper(shopper) {
    return this.http.post(this.url, shopper);
  }

  getUrlImage(filename: string): string {
    return `${this.url}/avatar/${filename}`;
  }

  getUrlImageProfile(): string {
    return `${this.url}/avatar`;
  }



}
