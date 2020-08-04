import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DetailOrder } from '@core/models/details.interface';
import { NgxSpinnerService } from 'ngx-spinner';


import { SaveOrder } from '@core/models/order-save.interface';
import { OrderService } from '@core/services/order/order.service';
import { TokenService } from '@core/services/tokens/token.service';
import { MessageServer } from '@core/models/message-server.interface';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {


  detail: DetailOrder[] = [];
  subcategoryId: string;
  errors: string[] = [];
  registerSuccess: boolean;
  addProduct: boolean;


  constructor(
    private orderService: OrderService,
    private tokenService: TokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.registerSuccess = false;
    this.addProduct = false;
    this.trySubcategoryId();
  }

  trySubcategoryId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.subcategoryId = params.id;
    });
  }

  receivedDetail(detail: DetailOrder): void {
    if (detail) {
      this.validateAmountDetail() ? this.pushError('Espera!, Alcanzaste el máximo de items del pedido') : this.addDetail(detail);
    }
  }

  deleteDetail(id: number): void {
    this.detail = this.detail.filter(item => item.id !== id);
  }

  addDetail(detail: DetailOrder): void {
    const date = new Date();
    this.detail.push({ ...detail, id: date.getTime() });
    this.addProduct = true;
    setTimeout(() => {
      this.addProduct = false;
    }, 1000);
  }

  saveOrder(header): void {
    this.spinner.show();
    this.errors.length = 0;
    const data: SaveOrder = {
      subcategoryId: this.subcategoryId,
      userId: this.tokenService.getUser(),
      ...header,
      details: [...this.detail]
    };
    this.orderService.createOrder(data)
      .subscribe((result: MessageServer) => {
        this.spinner.hide();
        if (result.status === 404) {
          this.pushError(result.error);
        } else {
          this.registerSuccess = true;
          this.router.navigate(['shopper/order']);
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
  }

  validateAmountDetail(): boolean {
    return this.detail.length === 2;
  }


  processError(error): void {
    if (error.status === 422) {
      this.destructuringError(error);
    }

    if (error.status === 500) {
      this.pushError('Error inesperado con el servidor, por favor vuelva a intentar!');
    }
  }

  destructuringError(error): void {
    const { error: { errors: validationErrors } } = error;

    for (const property in validationErrors) {
      if (validationErrors.hasOwnProperty(property)) {
        this.pushError(validationErrors[property]);
      }
    }

  }

  pushError(msg: string): void {
    this.errors.push(msg);
  }






}
