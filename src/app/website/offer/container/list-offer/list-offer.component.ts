import { Component, OnInit } from '@angular/core';
import { OfferShopper } from '@core/models/offers-shopper.interface';
import { OfferService } from '@core/services/offer/offer.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.scss']
})
export class ListOfferComponent implements OnInit {

  offers: OfferShopper[] = [];
  offersAccept: OfferShopper[] = [];
  dataFound: boolean;
  dataAccept: boolean;
  url: string;

  constructor(
    private offerService: OfferService,
    private load: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.dataFound = false;
    this.dataAccept = false;
    this.url = this.offerService.getUrlImage();
    this.fetchOrders();
    this.fetchOffersAccept();
  }

  fetchOrders(): void {
    this.load.show();
    this.offerService.getOffersToShopper(1, 1).subscribe(offers => {
      this.load.hide();
      this.offers = offers;
      if (!this.offers || this.offers.length === 0) {
        this.dataFound = true;
      }
    }, errors => {
      this.load.hide();
      this.dataFound = true;
    });
  }

  fetchOffersAccept(): void {
    this.offerService.getOffersToShopper(2, 2).subscribe(offers => {
      this.load.hide();
      this.offersAccept = offers;
      if (!this.offersAccept || this.offersAccept.length === 0) {
        this.dataAccept = true;
      }
    }, errors => {
      this.load.hide();
      this.dataAccept = true;
    });
  }

}
