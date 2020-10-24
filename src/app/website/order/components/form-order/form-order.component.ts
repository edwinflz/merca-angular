import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailOrder } from '@core/models/details.interface';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  form: FormGroup;
  @Output() sendDetail: EventEmitter<any> = new EventEmitter();
  showAmount: boolean;
  measures: string[];


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.showAmount = true;
    this.measures = ['Kilogramo', 'Gramos', 'Miligramos', 'Libras', 'Onza', 'Litro', 'Mililitro', 'Metros', 'Centimetros'];
    this.buildForm();
  }

  showFieldMeasure(): void {
    this.showAmount = !this.showAmount;
  }

  addProducts(): void {
    const item: DetailOrder = this.form.value;
    this.sendDetail.emit(item);
    this.form.reset();
  }

  get productField() {
    return this.form.get('product');
  }

  get amountField() {
    return this.form.get('amount');
  }

  get measureField() {
    return this.form.get('measure');
  }

  get brandField() {
    return this.form.get('brand');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      product: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      measure: [''],
      brand: ['']
    });
  }

}
