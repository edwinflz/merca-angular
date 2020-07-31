import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ListSubcategoriesComponent } from './container/list-subcategories/list-subcategories.component';
import { DialogSubcategoriesComponent } from './container/dialog-subcategories/dialog-subcategories.component';
import { ListStoreComponent } from './components/list-store/list-store.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ListSubcategoriesComponent,
    DialogSubcategoriesComponent,
    ListStoreComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class HomeModule { }
