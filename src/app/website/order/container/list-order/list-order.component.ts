import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order/order.service';
import { OrderShopper } from '@core/models/orders-shopper.interface';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: OrderShopper[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.fetchOrders(1);
  }

  fetchOrders(status: number): void {
    this.orderService.getOrdersToShopper(status).subscribe(orders => {
      this.orders = orders;
    });
  }

}
