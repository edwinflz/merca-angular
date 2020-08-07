import { Component, OnInit, Input } from '@angular/core';
import { OfferShopper } from '@core/models/offers-shopper.interface';


@Component({
  selector: 'app-card-offer-accept',
  templateUrl: './card-offer-accept.component.html',
  styleUrls: ['./card-offer-accept.component.scss']
})
export class CardOfferAcceptComponent implements OnInit {

  @Input() offer: OfferShopper;
  @Input() index: number;
  @Input() url: string;

  spinner = 'assets/img/spinner.gif';

  constructor() { }

  ngOnInit(): void {
  }

  getImage(photo: string): string {
    return `${this.url}/avatar/${photo}`;
  }


}
