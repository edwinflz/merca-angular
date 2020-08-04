import { Component, OnInit } from '@angular/core';
import { Municipality } from '@core/models/municipalities.interface';
import { Shopper } from '@core/models/shopper-interface';
import { MunicipalityService } from '@core/services/municipality/municipality.service';
import { TokenService } from '@core/services/tokens/token.service';
import { ProfileService } from '@core/services/profile/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  profile: boolean;
  municipalities: Municipality[] = [];
  user: string;
  shopperSuccess: boolean;
  success: string = '';
  errors: string[] = [];
  infoShopper: Shopper;

  constructor(
    private municipalityService: MunicipalityService,
    private tokenService: TokenService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.shopperSuccess = false;
    this.profile = true;
    this.user = this.tokenService.getUser();
    this.fetchAllMunicipalities();
    this.verifyProfile();
  }

  fetchAllMunicipalities(): void {
    this.municipalityService.getAllMunicipalities().subscribe(municipalities => {
      this.municipalities = municipalities;
    });
  }

  verifyProfile(): void {
    this.spinner.show();
    this.success = '';
    this.profileService.userHasProfileShopper().subscribe((data: any) => {
      this.spinner.hide();
      if (data.status === 404) {
        this.profile = true;
      } else {
        this.shopperSuccess = true;
        this.success = data.exito;
        this.profile = false;
        this.infoShopper = data.shopper;
        this.shopperSuccess = false;
      }
    }, error => {
      this.spinner.hide();
      this.processError(error);
    });
  }

  saveShopper(formData: any): void {
    this.spinner.show();
    this.errors.length = 0;
    this.profileService.createShopper(formData).subscribe(result => {
      this.spinner.hide();
      this.processResult(result);
    }, error => {
      this.spinner.hide();
      this.processError(error);
    });
  }

  processResult(result): void {
    if (result.exito) {
      this.shopperSuccess = true;
      this.success = result.exito;
      this.verifyProfile();
    } else {
      this.pushError(result.error);
    }
  }

  processError(error): void {
    this.shopperSuccess = false;

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
