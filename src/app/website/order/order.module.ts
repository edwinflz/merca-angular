import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './container/list-order/list-order.component';
import { CreateOrderComponent } from './container/create-order/create-order.component';
import { DialogCreateOrderComponent } from './container/dialog-create-order/dialog-create-order.component';
import { FormOrderComponent } from './components/form-order/form-order.component';
import { TableOrderComponent } from './components/table-order/table-order.component';
import { CardOrderComponent } from './components/card-order/card-order.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';


@NgModule({
  declarations: [ListOrderComponent, CreateOrderComponent, DialogCreateOrderComponent, FormOrderComponent, TableOrderComponent, CardOrderComponent, SkeletonCardComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
