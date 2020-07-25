import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { ListOfferComponent } from './list-offer/list-offer.component';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ListOfferComponent, DetailOfferComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    SharedModule
  ]
})
export class OfferModule { }
