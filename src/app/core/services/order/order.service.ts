import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { SaveOrder } from '@core/models/order-save.interface';
import { OrderShopper } from '@core/models/orders-shopper.interface';
import { TokenService } from '../tokens/token.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = `${environment.url_api}/api/solicitudes`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getOrdersToShopper(status: number): Observable<OrderShopper[]> {
    return this.http.get(`${this.url}/comprador/${this.tokenService.getUser()}/${status}`).pipe(
      map((response: any) => response.data as OrderShopper[])
    );
  }

  createOrder(order: SaveOrder) {
    return this.http.post(this.url, order);
  }


}
