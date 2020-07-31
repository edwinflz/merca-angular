import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    LazyLoadImageModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
