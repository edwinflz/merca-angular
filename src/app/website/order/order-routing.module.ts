import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderComponent } from './container/create-order/create-order.component';
import { ListOrderComponent } from './container/list-order/list-order.component';


const routes: Routes = [
  {
    path: '',
    component: ListOrderComponent
  },
  {
    path: ':id/:business',
    component: CreateOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
