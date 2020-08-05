import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Municipality } from '@core/models/municipalities.interface';
import { FileValidator } from 'ngx-material-file-input';
import { Category } from '@core/models/categories.interface';
import { SubCategory } from '@core/models/subcategories.interface';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  threeFormGroup: FormGroup;
  fourFormGroup: FormGroup;

  @Input() municipalities: Municipality[];
  @Input() categories: Category[];
  @Input() user: string;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();

  subcategories: SubCategory[] = [];
  subcategoriesSelected: SubCategory[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buidForm();
  }

  selectSubctagories(ids: number[]): void {
    this.subcategories.length = 0;

    ids.forEach(subcategory => {
      this.categories.forEach(category => {
        category.subcategories.forEach(sub => {
          if (sub.id === subcategory) {
            this.subcategories.push({ ...sub });
          }
        });
      });
    });

  }

  private buidForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      municipality: ['', Validators.required],
      domicile: ['', Validators.required],
      phone: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      category: ['', Validators.required]
    });
    this.threeFormGroup = this.formBuilder.group({
      accept: ['', Validators.required]
    });
    this.fourFormGroup = this.formBuilder.group({
      profile: ['', Validators.required],
      archivoRut: ['', Validators.required],
      archivoCedula: ['', Validators.required],
      archivoComercio: ['']
    });
  }

  get municipalityField() {
    return this.firstFormGroup.get('municipality');
  }

  get domicileField() {
    return this.firstFormGroup.get('domicile');
  }

  get nameField() {
    return this.firstFormGroup.get('name');
  }

  get phoneField() {
    return this.firstFormGroup.get('phone');
  }

  get categoryField() {
    return this.secondFormGroup.get('category');
  }

  get profileField() {
    return this.fourFormGroup.get('profile');
  }

  get rutField() {
    return this.fourFormGroup.get('archivoRut');
  }

  get cedulaField() {
    return this.fourFormGroup.get('archivoCedula');
  }

  get comercioField() {
    return this.fourFormGroup.get('archivoComercio');
  }

  sendDataBusiness(event: Event): void {
    event.preventDefault();
    const formData = new FormData();

    const fileForm = this.profileField.value;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < fileForm.files.length; index++) {
      formData.append(`profile${index}`, fileForm.files[index]);
    }

    const fileComercio = this.comercioField.value;

    if (fileComercio) {
      formData.append('archivoComercio', fileComercio.files[0]);
    }

    formData.append('municipality', this.municipalityField.value);
    formData.append('domicile', this.domicileField.value);
    formData.append('phone', this.phoneField.value);
    formData.append('name', this.nameField.value);
    formData.append('categories', this.categoryField.value);
    formData.append('archivoRut', this.rutField.value.files[0]);
    formData.append('archivoCedula', this.cedulaField.value.files[0]);

    formData.append('userId', this.user);

    this.sendFormData.emit(formData);

  }


}
