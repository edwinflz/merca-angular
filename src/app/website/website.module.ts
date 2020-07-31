import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { WebsiteRoutingModule } from './website-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
  ]
})
export class WebsiteModule { }
