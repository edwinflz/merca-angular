import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { OrderDetailShopper } from '@core/models/order-detail-shopper.interface';
import { OrderService } from '@core/services/order/order.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  orderId: string;
  order: OrderDetailShopper;
  orderTotal: number;
  form: FormGroup;
  details;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.tryOrderId();
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      prices: this.formBuilder.array([
        this.formBuilder.group({
          id: [0],
          price: [0]
        })
      ])
    });
  }

  get prices() {
    return this.form.get('prices') as FormArray;
  }

  addNewPrices() {
    this.prices.push(
      this.formBuilder.group({
        id: [0],
        price: [0]
      })
    )
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
    }, errors => this.spinner.hide());
  }

  showPrices(): void {
    console.log(this.form.value);
  }

}
