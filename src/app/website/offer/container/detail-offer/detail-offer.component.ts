import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '@core/services/offer/offer.service';
import { OfferDetailShopper } from '@core/models/offer-detail-shopper.interface';


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  showPrice: boolean;
  offerId: string;
  offerDetail: OfferDetailShopper;

  constructor(
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.showPrice = false;
    this.tryOfferId();
  }

  tryOfferId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.offerId = params.id;
      // tslint:disable-next-line: radix
      this.fetchOffer(parseInt(this.offerId));
    });
  }

  fetchOffer(id: number): void {
    this.offerService.getOfferDetailShopper(id).subscribe(offer => {
      this.offerDetail = offer;
    });
  }

  showPriceTable(): void {
    this.showPrice = !this.showPrice;
  }

}
