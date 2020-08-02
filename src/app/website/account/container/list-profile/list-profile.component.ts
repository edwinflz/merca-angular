import { Component, OnInit } from '@angular/core';
import { Municipality } from '@core/models/municipalities.interface';
import { MunicipalityService } from '@core/services/municipality/municipality.service';
import { TokenService } from '@core/services/tokens/token.service';

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

  constructor(
    private municipalityService: MunicipalityService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.profile = true;
    this.user = this.tokenService.getUser();
    this.fetchAllMunicipalities();
    this.spinner.show();
  }

  fetchAllMunicipalities(): void {
    this.municipalityService.getAllMunicipalities().subscribe(municipalities => {
      this.municipalities = municipalities;
    });
  }

}
