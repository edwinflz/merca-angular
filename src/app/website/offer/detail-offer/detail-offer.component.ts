import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  showPrice: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showPrice = false;
  }

  showPriceTable(): void {
    this.showPrice = !this.showPrice;
  }

}
