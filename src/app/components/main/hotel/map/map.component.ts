import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HotelService} from '../../../../services/hotel.service';
import {LocationsService} from '../../../../services/locations.service';
import * as moment from "moment";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService,
              private locationService: LocationsService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  map: any;
  userLocation: any;

  destination: string;
  startDate: Date;
  endDate: Date;
  room: number;
  guest: number;

  hotelData$: Subscription;
  hotelArea$: Subscription;
  hotelData: object[] = [];
  hotelArea: object[] = [];

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((succ) => {

      this.userLocation = succ;

      this.map = L.map('map', { zoomControl: false }).setView([this.userLocation.coords.latitude, this.userLocation.coords.longitude], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // this.map.scrollWheelZoom.disable();

      const temp = L.marker([this.userLocation.coords.latitude, this.userLocation.coords.longitude]);
      temp.addTo(this.map);

    }, () => {
    });

  }

  getAllParameterData(params) {

    if (params.destination === undefined) {
      this.router.navigateByUrl('/Hotel');
      return;
    }

    this.destination = params.destination;
    this.startDate = new Date(params.startDate);
    this.endDate = new Date(params.endDate);
    this.room = params.room;
    this.guest = params.guest;

    this.hotelData$ = this.hotelService.getHotelByCity(this.destination).subscribe(async query => {
      await this.getHotelData(query);
    });

    this.hotelArea$ = this.locationService.getLocationWithProvince(this.destination).subscribe(async query => {
      await this.getHotelArea(query);
    });

  }

  getHotelData(query) {
    this.hotelData = query.data.GetHotelByLocation;
  }

  getHotelArea(query) {
    this.hotelArea = query.data.GetCityByProvince;
  }

  goToSearchHotel() {
    this.router.navigateByUrl('Hotel');
  }

  goToListHotel() {
    this.router.navigate(['/Hotel/Search'], {
      queryParams: {
        destination: this.destination,
        startDate: moment(this.startDate).format('MM-DD-YYYY'),
        endDate: moment(this.endDate).format('MM-DD-YYYY'),
        room: this.room,
        guest: this.guest
      }
    });
  }
}
