import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-offer',
  templateUrl: './dialog-create-offer.component.html',
  styleUrls: ['./dialog-create-offer.component.scss']
})
export class DialogCreateOfferComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateOfferComponent>
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      visibilityPrice: ['', [Validators.required]],
      commentary: [''],
    });
  }

  doAction(): void {
    this.dialogRef.close({ event: 'Save', data: this.form.value });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  get visibilityPriceField() {
    return this.form.get('visibilityPrice');
  }

  get commentaryField() {
    return this.form.get('commentary');
  }

}
