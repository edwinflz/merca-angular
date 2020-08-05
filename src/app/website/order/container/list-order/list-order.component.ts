import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/order/order.service';
import { OrderShopper } from '@core/models/orders-shopper.interface';
import { OrderDetailShopper } from '@core/models/order-detail-shopper.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogListOrderComponent } from '../dialog-list-order/dialog-list-order.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: OrderShopper[] = [];
  order: OrderDetailShopper;
  dataFound: boolean;


  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private load: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.dataFound = false;
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.load.show();
    this.orderService.getOrdersToShopper().subscribe(orders => {
      this.orders = orders;
      this.load.hide();
      if (!this.orders) {
        this.dataFound = true;
      }
    }, errors => {
      this.load.hide();
      this.dataFound = true;
    });
  }

  openDialog(detail: OrderDetailShopper): void {
    this.dialog.open(DialogListOrderComponent, {
      data: {
        detail: { ...detail }
      }
    });
  }

  fetchOrder(id: number): void {
    this.orderService.getOrderDetailShopper(id).subscribe(order => {
      this.order = order;
      this.openDialog(this.order);
    });
  }

}
