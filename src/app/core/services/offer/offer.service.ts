import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { TokenService } from '../tokens/token.service';
import { OfferShopper } from '@core/models/offers-shopper.interface';
import { OfferDetailShopper } from '@core/models/offer-detail-shopper.interface';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private url = `${environment.url_api}/api/offers`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOffersToShopper(): Observable<OfferShopper[]> {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}/shopper`).pipe(
      map((response: any) => response.data as OfferShopper[])
    );
  }

  getOfferDetailShopper(id: number): Observable<OfferDetailShopper> {
    return this.http.get(`${this.url}/${id}/detail`).pipe(
      map((response: any) => response.data as OfferDetailShopper)
    );
  }
}
