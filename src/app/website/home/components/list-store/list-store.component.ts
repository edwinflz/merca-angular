import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss']
})
export class ListStoreComponent implements OnInit {

  center = {
    lat: 9.311664,
    lng: -75.379927,
  };
  zoom = 15;
  display?: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
