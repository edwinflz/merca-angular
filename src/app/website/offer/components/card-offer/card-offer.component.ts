import { Component, OnInit, Input } from '@angular/core';
import { OfferShopper } from '@core/models/offers-shopper.interface';

@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss']
})
export class CardOfferComponent implements OnInit {

  @Input() offer: OfferShopper;
  @Input() index: number;

  spinner = 'assets/img/spinner.gif';


  constructor() { }

  ngOnInit(): void {
  }

}
