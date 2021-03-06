import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrderComponent } from './container/list-order/list-order.component';
import { CreateOfferComponent } from './container/create-offer/create-offer.component';


const routes: Routes = [
  {
    path: '',
    component: ListOrderComponent
  },
  {
    path: ':id',
    component: CreateOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
