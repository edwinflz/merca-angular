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
import { TokenService } from '@core/services/tokens/token.service';

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
  spinner: boolean;


  constructor(
    private orderService: OrderService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.spinner = false;
    this.trySubcategoryId();
  }

  trySubcategoryId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subcategoryId = params.id;
    });
  }

  receivedDetail(detail: DetailOrder): void {
    if (detail) {
      this.validateAmountDetail() ? this.showMessage('Espera!', 'Alcanzaste el máximo de items del pedido') : this.addDetail(detail);
    }
  }

  deleteDetail(id: number): void {
    this.detail = this.detail.filter(item => item.id !== id);
  }

  addDetail(detail: DetailOrder): void {
    const date = new Date();
    this.detail.push({ ...detail, id: date.getTime() });
    this.showMessage('Bien!', 'Acabas de agregar un producto');
  }

  saveOrder(header): void {
    this.spinner = true;
    const data: SaveOrder = {
      subcategoryId: this.subcategoryId,
      userId: this.tokenService.getUser(),
      ...header,
      details: [...this.detail]
    };
    this.orderService.createOrder(data)
      .subscribe(result => {
        this.spinner = false;
        this.processResult(result);
      }, error => {
        this.spinner = false;
        this.processError(error);
      });
  }

  validateAmountDetail(): boolean {
    return this.detail.length === 10;
  }

  showMessage(first: string, second: string): void {
    this.snackBar.open(first, second, {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  processError(error): void {
    if (error.status === 422) {
      this.destructuringError(error);
    }

    if (error.status === 500) {
      this.showMessage('Oops!', 'Ocurrio un Error inesperado con el servidor!');
    }
  }

  destructuringError(error): void {
    const { error: { errors: validationErrors } } = error;

    for (const property in validationErrors) {
      if (validationErrors.hasOwnProperty(property)) {
        this.showMessage('Oops!', validationErrors[property]);
      }
    }
  }

  processResult(result): void {
    if (result.exito) {
      this.showMessage('Genial', result.exito);
      this.router.navigate(['website/shopper/order']);
    } else {
      this.showMessage('Algo Ocurrio', result.error);
    }
  }



}
