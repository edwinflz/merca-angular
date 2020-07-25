import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { ListSubcategoriesComponent } from './container/list-subcategories/list-subcategories.component';
import { DialogSubcategoriesComponent } from './container/dialog-subcategories/dialog-subcategories.component';
import { ListStoreComponent } from './components/list-store/list-store.component';
import { SkeletonSubcategoriesComponent } from './components/skeleton-subcategories/skeleton-subcategories.component';

@NgModule({
  declarations: [
    ListSubcategoriesComponent,
    DialogSubcategoriesComponent,
    ListStoreComponent,
    SkeletonSubcategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class HomeModule { }
