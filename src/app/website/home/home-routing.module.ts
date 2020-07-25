import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSubcategoriesComponent } from './container/list-subcategories/list-subcategories.component';


const routes: Routes = [
  {
    path: '',
    component: ListSubcategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
