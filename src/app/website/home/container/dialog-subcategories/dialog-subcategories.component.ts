import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubCategory } from '@core/models/subcategories.interface';

@Component({
  selector: 'app-dialog-subcategories',
  templateUrl: './dialog-subcategories.component.html',
  styleUrls: ['./dialog-subcategories.component.scss']
})
export class DialogSubcategoriesComponent implements OnInit {

  subcategory: SubCategory;

  constructor(
    public dialogRef: MatDialogRef<DialogSubcategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subcategory = this.data.subcategory;
  }

  navigateToCreateOrder(id: number): void {
    this.close();
    this.router.navigate(['shopper/order', id]);
  }

  close(): void {
    this.dialogRef.close();
  }

}
