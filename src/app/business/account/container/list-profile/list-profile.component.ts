import { Component, OnInit } from '@angular/core';

import { Municipality } from '@core/models/municipalities.interface';
import { Category } from '@core/models/categories.interface';
import { MunicipalityService } from '@core/services/municipality/municipality.service';

import { SubcategoryService } from '@core/services/subcategory/subcategory.service';


@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  profile: boolean;
  municipalities: Municipality[] = [];
  categories: Category[] = [];

  constructor(
    private municipalityService: MunicipalityService,
    private subcategoryService: SubcategoryService,
  ) { }

  ngOnInit(): void {
    this.profile = true;
    this.fetchAllMunicipalities();
    this.fetchCategories();
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
}
