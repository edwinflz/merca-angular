import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ListOfferComponent } from './container/list-offer/list-offer.component';
import { DetailOfferComponent } from './container/detail-offer/detail-offer.component';
import { CardOfferComponent } from './components/card-offer/card-offer.component';


@NgModule({
  declarations: [ListOfferComponent, DetailOfferComponent, CardOfferComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    SharedModule
  ]
})
export class OfferModule { }
