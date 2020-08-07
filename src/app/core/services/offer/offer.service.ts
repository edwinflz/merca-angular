import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { TokenService } from '../tokens/token.service';
import { OfferShopper } from '@core/models/offers-shopper.interface';
import { OfferDetailShopper } from '@core/models/offer-detail-shopper.interface';
import { OffersStatus } from '../../models/offers-status.interface';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private url = `${environment.url_api}/api/offers`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOffersToShopper(orderStatus: number, offerStatus: number): Observable<OfferShopper[]> {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}/${orderStatus}/${offerStatus}/shopper`).pipe(
      map((response: any) => response.data as OfferShopper[])
    );
  }

  getOfferDetailShopper(id: number): Observable<OfferDetailShopper> {
    return this.http.get(`${this.url}/${id}/detail`).pipe(
      map((response: any) => response.data as OfferDetailShopper)
    );
  }

  offerAccept(id: number, orderId: number) {
    return this.http.get(`${this.url}/${id}/${orderId}/accept`);
  }

  offerCancel(id: number) {
    return this.http.get(`${this.url}/${id}/cancel`);
  }

  offersStatus(status): Observable<OffersStatus[]> {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}/${status}/estado`).pipe(
      map((response: any) => response.data as OffersStatus[])
    );
  }

  createOffer(offer) {
    return this.http.post(this.url, offer);
  }

  getUrlImage(): string {
    return `${this.url}/business`;
  }
}
