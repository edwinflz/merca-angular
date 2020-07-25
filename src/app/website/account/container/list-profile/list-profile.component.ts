import { Component, OnInit } from '@angular/core';
import { Municipality } from '@core/models/municipalities.interface';
import { MunicipalityService } from '@core/services/municipality/municipality.service';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  profile: boolean;
  municipalities: Municipality[] = [];

  constructor(
    private municipalityService: MunicipalityService
  ) { }

  ngOnInit(): void {
    this.profile = true;
    this.fetchAllMunicipalities();
  }

  fetchAllMunicipalities(): void {
    this.municipalityService.getAllMunicipalities().subscribe(municipalities => {
      this.municipalities = municipalities;
    });
  }

}
