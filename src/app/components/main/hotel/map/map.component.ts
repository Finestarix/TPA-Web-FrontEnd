import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() {
  }

  map: any;
  userLocation: any;

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((succ) => {

      this.userLocation = succ;
      console.log(succ.coords.longitude + ' ' + succ.coords.latitude);

      this.map = L.map('map').setView([this.userLocation.coords.latitude, this.userLocation.coords.longitude], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // this.map.scrollWheelZoom.disable();

      const temp = L.marker([this.userLocation.coords.latitude, this.userLocation.coords.longitude]);
      temp.addTo(this.map);

    }, () => {
    });

  }

}
