import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '@core/services/order/order.service';
import { TokenService } from '@core/services/tokens/token.service';
import { OrderDetailShopper } from '@core/models/order-detail-shopper.interface';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreateOfferComponent } from '../../components/dialog-create-offer/dialog-create-offer.component';
import { MessageServer } from '@core/models/message-server.interface';
import { OfferService } from '@core/services/offer/offer.service';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  orderId: string;
  order: OrderDetailShopper;
  orderTotal = 0;
  form: FormGroup;
  errors: string[] = [];
  registerSuccess: boolean;


  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private offerService: OfferService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.tryOrderId();
    this.registerSuccess = false;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      details: this.formBuilder.array([])
    });
  }

  createItem(): void {
    this.details.push(
      this.formBuilder.group({
        id: [''],
        product: [''],
        amount: [0],
        brand: [''],
        measure: [''],
        price: [0, [Validators.required]],
      })
    );
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  tryOrderId(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderId = params.id;
      this.fetchOrder(+this.orderId);
    });
  }

  fetchOrder(id: number): void {
    this.spinner.show();
    this.orderService.getOrderDetailShopper(id).subscribe(order => {
      this.spinner.hide();
      this.order = order;
      this.controlsProduct();
    }, errors => this.spinner.hide());
  }

  controlsProduct(): void {
    for (let index = 0; index < this.order.details.length; index++) {
      this.createItem();
    }
    this.form.patchValue({ details: [...this.order.details] });
  }

  sumTotal(measure: string, amount: number, price: number): number {
    if (measure) {
      return price * amount;
    }
    return price;
  }

  showTotal(): void {
    this.orderTotal = 0;
    this.details.value.forEach((detail: any) => {
      if (detail.id) {
        if (detail.measure) {
          this.orderTotal += detail.price * detail.amount;
        } else {
          this.orderTotal = this.orderTotal + detail.price;
        }
      }
    });
  }

  confirmOrder(): void {
    if (this.orderTotal === 0) {
      this.pushError('Por favor digite el precio de al menos un producto solicitado por el comprador');
    } else {
      const dialogRef = this.dialog.open(DialogCreateOfferComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Save') {
          this.createDataOffer(result.data);
        }
      });
    }
  }

  createDataOffer(data): void {
    this.errors.length = 0;
    const offer = {
      orderId: this.orderId,
      userId: this.tokenService.getUser(),
      total: this.orderTotal,
      ...data,
      details: [...this.details.value]
    };
    this.saveOffer(offer);
  }

  saveOffer(offer): void {
    this.spinner.show();
    this.offerService.createOffer(offer)
      .subscribe((result: MessageServer) => {
        this.spinner.hide();
        if (result.status === 500) {
          this.pushError(result.error);
        } else {
          this.registerSuccess = true;
          this.router.navigate(['business/salesman/order']);
        }
      }, error => {
        this.spinner.hide();
        this.processError(error);
      });
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
