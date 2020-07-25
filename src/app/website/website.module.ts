import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';


import { WebsiteRoutingModule } from './website-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [LayoutComponent, LoginComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
  ]
})
export class WebsiteModule { }
