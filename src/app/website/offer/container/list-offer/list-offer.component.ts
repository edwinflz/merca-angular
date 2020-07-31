import { Component, OnInit } from '@angular/core';
import { OfferShopper } from '@core/models/offers-shopper.interface';
import { OfferService } from '@core/services/offer/offer.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.scss']
})
export class ListOfferComponent implements OnInit {

  offers: OfferShopper[] = [];

  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.offerService.getOffersToShopper().subscribe(offers => {
      this.offers = offers;
    });
  }

}
