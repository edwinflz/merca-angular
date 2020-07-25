import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { BusinessRoutingModule } from './business-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LoginComponent, LayoutComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    RouterModule,
    MaterialModule,
  ]
})
export class BusinessModule { }
