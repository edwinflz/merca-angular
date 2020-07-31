import { Component, OnInit, Input } from '@angular/core';
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
      domicile: ['', Validators.required]
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

}
