import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProfileComponent } from './container/list-profile/list-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ListProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
