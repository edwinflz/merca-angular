import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailShopper } from '@core/models/order-detail-shopper.interface';


@Component({
  selector: 'app-dialog-list-order',
  templateUrl: './dialog-list-order.component.html',
  styleUrls: ['./dialog-list-order.component.scss']
})
export class DialogListOrderComponent implements OnInit {

  orderDetail: OrderDetailShopper;

  constructor(
    public dialogRef: MatDialogRef<DialogListOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.orderDetail = this.data.detail;
  }

}
