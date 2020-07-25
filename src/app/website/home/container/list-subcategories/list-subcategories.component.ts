import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Category } from '@core/models/categories.interface';
import { SubCategory } from '@core/models/subcategories.interface';

import { DialogSubcategoriesComponent } from '../dialog-subcategories/dialog-subcategories.component';
import { SubcategoryService } from '@core/services/subcategory/subcategory.service';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.scss']
})
export class ListSubcategoriesComponent implements OnInit {

  categories: Category[] = [];
  subcategory: SubCategory;
  spinner = 'assets/img/spinner.gif';

  constructor(
    private subcategoryService: SubcategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.subcategoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  openDialog(sub: SubCategory): void {
    this.dialog.open(DialogSubcategoriesComponent, {
      data: {
        subcategory: sub
      }
    });
  }



}
