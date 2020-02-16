import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HotelService} from '../../../../services/hotel.service';
import {LocationsService} from '../../../../services/locations.service';
import * as moment from 'moment';
import {LabelType, Options} from 'ng5-slider';
import {SearchHotel} from '../../../../helpers/search-hotel';


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
    this.searchHotel = '';
    this.currentPrice = 'Night';

    this.hideStar = 'Hide';
    this.hideFacility = 'Hide';
    this.hideArea = 'Hide';

  }

  currentPrice: string;

  map: any;
  userLocation: any;
  marker: any[] = [];
  filteredMarker: any[] = [];

  checkboxStar: boolean[] = [false, false, false, false, false];
  chekboxArea: boolean[] = [];
  chekboxFacility: boolean[] = [false, false, false, false, false, false, false, false];
  hotelFacility: string[] = ['24 Hour-Frontdesk', 'AC', 'Elevator', 'Parking', 'Restaurant', 'SPA', 'Swimming Pool', 'WiFi'];

  searchHotel: string;

  hideStar: string;
  hideFacility: string;
  hideArea: string;

  value = 0;
  highValue = 5000000;
  options: Options = {
    floor: 0,
    ceil: 5000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'IDR ' + Math.floor(value / 1000) + 'K';
        case LabelType.High:
          return 'IDR ' + Math.floor(value / 1000) + 'K';
        default:
          return '';
      }
    }
  };

  hotelData$: Subscription;
  hotelArea$: Subscription;
  hotelData: object[] = [];
  hotelArea: object[] = [];
  hotelTotalRating: number[] = [0, 0, 0, 0, 0];

  currentHotel: object;

  destination: string;
  startDate: Date;
  endDate: Date;
  room: number;
  guest: number;
  dateDiff: number;

  lastValue: number;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((succ) => {

      this.userLocation = succ;

      this.map = L.map('map', {zoomControl: false}).setView([this.userLocation.coords.latitude, this.userLocation.coords.longitude], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const temp = L.marker([this.userLocation.coords.latitude, this.userLocation.coords.longitude]);
      temp.addTo(this.map);

    }, () => {
    });

    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
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

    this.dateDiff = this.endDate.getDate() - this.startDate.getDate();

    this.hotelData$ = this.hotelService.getHotelByCity(this.destination).subscribe(async query => {
      await this.getHotelData(query);
    });

    this.hotelArea$ = this.locationService.getLocationWithProvince(this.destination).subscribe(async query => {
      await this.getHotelArea(query);
    });

  }

  getCeilValue(index: number, value: number) {
    // @ts-ignore
    return Math.ceil(this.hotelData[index].rating) === value;
  }

  increaseTotalRating() {
    for (let i = 0; i < this.hotelData.length; i++) {
      if (this.getCeilValue(i, 1)) {
        this.hotelTotalRating[0]++;
      } else if (this.getCeilValue(i, 2)) {
        this.hotelTotalRating[1]++;
      } else if (this.getCeilValue(i, 3)) {
        this.hotelTotalRating[2]++;
      } else if (this.getCeilValue(i, 4)) {
        this.hotelTotalRating[3]++;
      } else if (this.getCeilValue(i, 5)) {
        this.hotelTotalRating[4]++;
      }
    }
  }

  getAllMarker() {
    let counter = 0;

    for (const hotel of this.hotelData) {
      // @ts-ignore
      this.marker[counter++] = new L.marker([hotel.latitude, hotel.longitude]);
    }
  }

  getHotelData(query) {
    this.hotelData = query.data.GetHotelByLocation;
    this.increaseTotalRating();
    this.getAllMarker();
    this.detectChange();
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

  resetAll() {
    this.checkboxStar = [false, false, false, false, false];
    this.chekboxFacility = [false, false, false, false, false, false, false, false];
    this.value = 0;
    this.searchHotel = '';
    this.highValue = 5000000;
    this.lastValue = 0;
  }

  removeAllLayer(allMarker, filteredMarker) {

    if (!this.map) {
      return;
    }

    for (const mark of allMarker) {
      this.map.removeLayer(mark);
    }

    for (const mark of filteredMarker) {
      this.map.removeLayer(mark);
    }
  }

  markAllLayer(allMarker) {

    let counter = 0;

    if (!this.map) {
      return;
    }

    for (const mark of allMarker) {

      if (this.currentPrice === 'Night') {
        // @ts-ignore
        mark.bindTooltip(String(this.formatter.format(this.hotelData[counter++].price)), {permanent: true});
      } else {
        // @ts-ignore
        mark.bindTooltip(String(this.formatter.format(this.hotelData[counter++].price * this.dateDiff)), {permanent: true});
      }

      mark.on('click', (e) => {
        this.hotelService.getHotelByLatLong(e.latlng.lat, e.latlng.lng).subscribe(async query => {
          await this.changeCurrentHotel(query);
        });
      });
      mark.addTo(this.map);
    }
  }

  markFilteredHotel(filteredHotel) {

    if (!this.map) {
      return;
    }

    let counter = 0;

    for (const hotel of filteredHotel) {
      // @ts-ignore
      this.filteredMarker[counter] = new L.marker([hotel.latitude, hotel.longitude]);
      // @ts-ignore
      this.filteredMarker[counter].bindTooltip(String(this.formatter.format(hotel.price * this.dateDiff)), {permanent: true});
      this.filteredMarker[counter].on('click', (e) => {
        this.hotelService.getHotelByLatLong(e.latlng.lat, e.latlng.lng).subscribe(async query => {
          await this.changeCurrentHotel(query);
        });
      });
      this.filteredMarker[counter++].addTo(this.map);
    }
  }

  changeCurrentHotel(query) {
    this.currentHotel = query.data.GetHotelByLatLong;
  }

  detectChange() {

    const allMarker = this.marker;
    const filteredMarker = this.filteredMarker;

    if (this.checkboxStar.includes(true) || this.chekboxFacility.includes(true) || this.chekboxArea.includes(true) ||
      this.value !== 0 || this.highValue !== 5000000 || this.searchHotel !== '') {
      this.lastValue = 1;
      this.removeAllLayer(allMarker, filteredMarker);
      const filteredHotel = SearchHotel.search(this.hotelData, [this.searchHotel,
        this.checkboxStar[0], this.checkboxStar[1], this.checkboxStar[2], this.checkboxStar[3], this.checkboxStar[4],
        this.value, this.highValue,
        this.chekboxFacility[0], this.chekboxFacility[1], this.chekboxFacility[2], this.chekboxFacility[3],
        this.chekboxFacility[4], this.chekboxFacility[5], this.chekboxFacility[6], this.chekboxFacility[7],
        this.chekboxArea, this.hotelArea,
        this.lastValue]);
      this.markFilteredHotel(filteredHotel);
    } else {
      this.lastValue = 0;
      this.removeAllLayer(allMarker, filteredMarker);
      this.markAllLayer(allMarker);
    }

    if (this.checkboxStar.includes(true)) {

    }


  }

  changeHideStar() {
    this.hideStar = (this.hideStar === 'Show') ? 'Hide' : 'Show';
  }

  changeHideFacility() {
    this.hideFacility = (this.hideFacility === 'Show') ? 'Hide' : 'Show';
  }

  changeHideArea() {
    this.hideArea = (this.hideArea === 'Show') ? 'Hide' : 'Show';
  }
}
