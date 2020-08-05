import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { DialogSubcategoriesComponent } from '../dialog-subcategories/dialog-subcategories.component';

import { Category } from '@core/models/categories.interface';
import { SubCategory } from '@core/models/subcategories.interface';

import { SubcategoryService } from '@core/services/subcategory/subcategory.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.scss']
})
export class ListSubcategoriesComponent implements OnInit {

  categories: Category[] = [];
  subcategory: SubCategory;
  dataFound: boolean;
  spinner = 'assets/img/spinner.gif';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  };

  constructor(
    public dialog: MatDialog,
    private subcategoryService: SubcategoryService,
    private load: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.dataFound = false;
    this.fetchCategories();
  }


  fetchCategories(): void {
    this.load.show();
    this.subcategoryService.getAllCategories().subscribe(categories => {
      this.load.hide();
      this.categories = categories;
      if (this.categories.length === 0) {
        this.dataFound = true;
      }
    }, errors => {
      this.load.hide();
      this.dataFound = true;
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
