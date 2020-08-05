import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() user: string;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();
  readonly maxSize = 400000;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
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
      profile: ['', [FileValidator.maxContentSize(this.maxSize)]]
    });
  }

  sendDataShopper(event: Event): void {
    event.preventDefault();
    const formData = new FormData();

    const fileForm = this.profileField.value;

    if (fileForm) {
      formData.append('profile', fileForm.files[0]);
    }

    formData.append('municipality', this.municipalityField.value);
    formData.append('domicile', this.domicileField.value);
    formData.append('domicileTwo', this.domicileTwoField.value);
    formData.append('domicileThree', this.domicileThreeField.value);
    formData.append('userId', this.user);


    if (this.form.valid) {
      this.sendFormData.emit(formData);
    }

  }


}
