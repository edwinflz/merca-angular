import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Municipality } from '@core/models/municipalities.interface';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  form: FormGroup;
  @Input() municipalities: Municipality[];
  readonly maxSize = 100000;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  saveShopper(event: Event) {

  }

  get municipalityField() {
    return this.form.get('municipality');
  }

  get domicileField() {
    return this.form.get('domicile');
  }

  get domicileTwoField() {
    return this.form.get('domicileTwo');
  }

  get domicileThreeField() {
    return this.form.get('domicileThree');
  }

  get profileField() {
    return this.form.get('profile');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      municipality: ['', [Validators.required]],
      domicile: ['', [Validators.required]],
      domicileTwo: [''],
      domicileThree: [''],
      profile: ['', [Validators.required, FileValidator.maxContentSize(this.maxSize)]]
    });
  }


}
