import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetailOrder } from '@core/models/details.interface';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreateOrderComponent } from '../../container/dialog-create-order/dialog-create-order.component';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss']
})
export class TableOrderComponent implements OnInit {

  @Input() detail: DetailOrder[];
  @Output() deleteDetail: EventEmitter<any> = new EventEmitter();
  @Output() sendRequestSave: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  confirmOrder(): void {
    const dialogRef = this.dialog.open(DialogCreateOrderComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Save') {
        this.sendRequestSave.emit(result.data);
      }
    });
  }

  deleteItem(id: number): void {
    this.deleteDetail.emit(id);
  }

}
