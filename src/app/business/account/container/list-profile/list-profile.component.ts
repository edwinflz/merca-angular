import { Component, OnInit } from '@angular/core';

import { Municipality } from '@core/models/municipalities.interface';
import { Category } from '@core/models/categories.interface';
import { MunicipalityService } from '@core/services/municipality/municipality.service';
import { TokenService } from '@core/services/tokens/token.service';
import { SubcategoryService } from '@core/services/subcategory/subcategory.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessService } from '@core/services/business/business.service';
import { Business } from '@core/models/business.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  profile: boolean;
  municipalities: Municipality[] = [];
  categories: Category[] = [];
  user: string;
  businessSuccess: boolean;
  success: string = '';
  errors: string[] = [];
  infoBusiness: Business;


  constructor(
    private router: Router,
    private municipalityService: MunicipalityService,
    private subcategoryService: SubcategoryService,
    private tokenService: TokenService,
    private businessService: BusinessService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.fetchAllMunicipalities();
    this.fetchCategories();
    this.verifyProfile();
  }

  verifyProfile(): void {
    this.spinner.show();
    this.success = '';
    this.businessService.userHasProfileSalesman().subscribe((data: any) => {
      this.spinner.hide();
      if (data.status === 404) {
        this.profile = true;
      } else {
        this.businessSuccess = true;
        this.success = data.exito;
        this.profile = false;
        this.infoBusiness = data.business;
        this.router.navigate(['business/salesman/order']);
        this.businessSuccess = false;
      }
    }, error => {
      this.spinner.hide();
      this.processError(error);
    });
  }


  processResult(result): void {
    if (result.exito) {
      this.businessSuccess = true;
      this.success = result.exito;
      this.verifyProfile();
    } else {
      this.pushError(result.error);
    }
  }

  processError(error): void {
    this.businessSuccess = false;

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


  fetchAllMunicipalities(): void {
    this.municipalityService.getAllMunicipalities().subscribe(municipalities => {
      this.municipalities = municipalities;
    });
  }

  fetchCategories(): void {
    this.subcategoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveBusiness(formData: any): void {
    this.spinner.show();
    this.errors.length = 0;
    this.businessService.createBusiness(formData).subscribe(result => {
      this.spinner.hide();
      this.processResult(result);
    }, error => {
      this.spinner.hide();
      this.processError(error);
    });
  }
}
