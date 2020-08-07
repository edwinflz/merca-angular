import { Component, OnInit } from '@angular/core';
import { BusinessService } from '@core/services/business/business.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageServer } from '@core/models/message-server.interface';
import { OrderService } from '@core/services/order/order.service';
import { OrderBusiness } from '@core/models/orders-business.interface';
import { OfferService } from '@core/services/offer/offer.service';
import { OffersStatus } from '@core/models/offers-status.interface';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: OrderBusiness[] = [];
  offersAccept: OffersStatus[] = [];
  offersActives: OffersStatus[] = [];
  load = 'assets/img/spinner.gif';

  dataFound: boolean;
  dataAccept: boolean;
  dataActive: boolean;

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.dataFound = false;
    this.dataAccept = false;
    this.dataActive = false;
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
        this.fetchOffers();
        this.fetchOffersAccept();
      }
    }, error => this.spinner.hide());
  }

  fetchOrders(): void {
    this.spinner.show();
    this.orderService.getOrdersToBusiness().subscribe(orders => {
      this.orders = orders;
      if (!this.orders || this.orders.length === 0) {
        this.dataFound = true;
      }
      this.spinner.hide();
    }, errors => {
      this.spinner.hide();
      this.dataFound = true;
    });
  }

  fetchOffers(): void {
    this.spinner.hide();
    this.offerService.offersStatus(1).subscribe(offers => {
      this.offersActives = offers;
      if (!this.offersActives || this.offersActives.length === 0) {
        this.dataActive = true;
      }
    }, errors => {
      this.spinner.hide();
      this.dataActive = true;
    });
  }

  fetchOffersAccept(): void {
    this.spinner.hide();
    this.offerService.offersStatus(2).subscribe(offers => {
      this.offersAccept = offers;
      if (!this.offersAccept || this.offersAccept.length === 0) {
        this.dataAccept = true;
      }
    }, errors => {
      this.spinner.hide();
      this.dataAccept = true;
    });
  }

}
