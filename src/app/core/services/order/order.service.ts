import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { SaveOrder } from '@core/models/order-save.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = `${environment.url_api}/api/solicitudes`;

  constructor(private http: HttpClient) { }

  createOrder(order: SaveOrder) {
    return this.http.post(this.url, order);
  }


}
