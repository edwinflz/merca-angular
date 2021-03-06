import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './container/list-order/list-order.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateOfferComponent } from './container/create-offer/create-offer.component';
import { DialogCreateOfferComponent } from './components/dialog-create-offer/dialog-create-offer.component';


@NgModule({
  declarations: [ListOrderComponent, CreateOfferComponent, DialogCreateOfferComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
