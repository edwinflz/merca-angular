import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '@core/services/offer/offer.service';
import { OfferDetailShopper } from '@core/models/offer-detail-shopper.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageServer } from '@core/models/message-server.interface';


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  showPrice: boolean;
  offerId: string;
  orderId: string;
  offerDetail: OfferDetailShopper;
  errors: string[] = [];
  registerSuccess: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private load: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPrice = false;
    this.tryOfferId();
  }

  tryOfferId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.offerId = params.id;
      this.orderId = params.orderId;
      // tslint:disable-next-line: radix
      this.fetchOffer(parseInt(this.offerId));
    });
  }

  fetchOffer(id: number): void {
    this.load.show();
    this.offerService.getOfferDetailShopper(id).subscribe(offer => {
      this.offerDetail = offer;
      this.load.hide();
    }, errors => this.load.hide());
  }

  showPriceTable(): void {
    this.showPrice = !this.showPrice;
  }

  offerAccept(offerId: number, orderId: number): void {
    this.load.show();
    this.offerService.offerAccept(offerId, orderId).subscribe((result: MessageServer) => {
      this.load.hide();
      if (result.status === 500) {
        this.pushError(result.error);
      } else {
        this.registerSuccess = result.exito;
        this.router.navigate(['shopper/offer']);
      }
    }, errors => this.load.hide());
  }

  offerCancel(id): void {
    this.load.show();
    this.offerService.offerCancel(id).subscribe((result: MessageServer) => {
      this.load.hide();
      if (result.status === 500) {
        this.pushError(result.error);
      } else {
        this.registerSuccess = result.exito;
        this.router.navigate(['shopper/offer']);
      }
    }, errors => this.load.hide());
  }

  pushError(msg: string): void {
    this.errors.push(msg);
  }

}
