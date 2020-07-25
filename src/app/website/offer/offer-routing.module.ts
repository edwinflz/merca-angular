import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfferComponent } from './list-offer/list-offer.component';
import { DetailOfferComponent } from './detail-offer/detail-offer.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfferComponent
  },
  {
    path: ':id',
    component: DetailOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
