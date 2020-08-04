import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfferComponent } from './container/list-offer/list-offer.component';
import { DetailOfferComponent } from './container/detail-offer/detail-offer.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfferComponent
  },
  {
    path: ':id/:orderId',
    component: DetailOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
