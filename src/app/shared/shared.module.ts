import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    LazyLoadImageModule
  ]
})
export class SharedModule { }
