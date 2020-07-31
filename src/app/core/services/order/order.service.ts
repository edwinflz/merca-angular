import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { SaveOrder } from '@core/models/order-save.interface';
import { OrderShopper } from '@core/models/orders-shopper.interface';
import { TokenService } from '../tokens/token.service';
import { OrderDetailShopper } from '@core/models/order-detail-shopper.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = `${environment.url_api}/api/orders`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOrdersToShopper(): Observable<OrderShopper[]> {
    return this.http.get(`${this.url}/${this.tokenService.getUser()}/shopper`).pipe(
      map((response: any) => response.data as OrderShopper[])
    );
  }

  getOrderDetailShopper(id: number): Observable<OrderDetailShopper> {
    return this.http.get(`${this.url}/${id}/detail`).pipe(
      map((response: any) => response.data as OrderDetailShopper)
    );
  }

  createOrder(order: SaveOrder) {
    return this.http.post(this.url, order);
  }


}
