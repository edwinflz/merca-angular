import { Component, OnInit } from '@angular/core';
import { BusinessService } from '@core/services/business/business.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageServer } from '@core/models/message-server.interface';
import { OrderService } from '@core/services/order/order.service';
import { OrderBusiness } from '@core/models/orders-business.interface';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: OrderBusiness[] = [];
  load = 'assets/img/spinner.gif';


  constructor(
    private router: Router,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser(): void {
    this.spinner.show();
    this.businessService.userHasProfileSalesman().subscribe((data: MessageServer) => {
      this.spinner.hide()
      if (data.status === 404) {
        this.router.navigate(['business/salesman/account']);
      } else {
       this.fetchOrders();
      }
    }, error => this.spinner.hide());
  }

  fetchOrders(): void {
    this.spinner.show();
    this.orderService.getOrdersToBusiness().subscribe(orders => {
      this.orders = orders;
      this.spinner.hide();
    }, errors => this.spinner.hide());
  }

}
