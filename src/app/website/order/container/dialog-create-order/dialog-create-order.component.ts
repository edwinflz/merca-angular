import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-order',
  templateUrl: './dialog-create-order.component.html',
  styleUrls: ['./dialog-create-order.component.scss'],
})
export class DialogCreateOrderComponent implements OnInit {
  form: FormGroup;
  payments: string[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateOrderComponent>
  ) {}

  ngOnInit(): void {
    this.payments = ['Efectivo', 'Tarjeta (Datafono)'];
    this.buildForm();
  }

  doAction(): void {
    this.dialogRef.close({ event: 'Save', data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  get commentaryField() {
    return this.form.get('commentary');
  }

  get paymentField() {
    return this.form.get('payment');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      payment: [this.payments[0], [Validators.required]],
      commentary: [''],
    });
  }
}
