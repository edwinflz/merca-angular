import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DetailOrder } from '@core/models/details.interface';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { SaveOrder } from '@core/models/order-save.interface';
import { OrderService } from '@core/services/order/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  detail: DetailOrder[] = [];
  subcategoryId: string;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.trySubcategoryId();
  }

  trySubcategoryId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subcategoryId = params.id;
    });
  }

  receivedDetail(detail: DetailOrder): void {
    if (detail) {
      this.validateAmountDetail() ? this.showDanger() : this.addDetail(detail);
    }
  }

  deleteDetail(id: number): void {
    this.detail = this.detail.filter(item => item.id !== id);
  }

  addDetail(detail: DetailOrder): void {
    const date = new Date();
    this.detail.push({ ...detail, id: date.getTime() });
    this.showSuccess();
  }

  saveOrder(header): void {
    const data: SaveOrder = {
      subcategoryId: this.subcategoryId,
      ...header,
      details: [...this.detail]
    };
    this.orderService.createOrder(data)
      .subscribe(exito => {
        console.log(exito);
      }, error => console.log(error));
  }

  validateAmountDetail(): boolean {
    return this.detail.length === 10;
  }

  showSuccess(): void {
    this.snackBar.open('Bien!', 'Acabas de agregar un producto', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showDanger(): void {
    this.snackBar.open('Espera!', 'Alcanzaste el máximo de items del pedido', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }



}
