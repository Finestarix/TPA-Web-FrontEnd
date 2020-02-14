import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Moment} from 'moment';
import {HotelService} from '../../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {LabelType, Options} from 'ng5-slider';
import * as moment from 'moment';
import {LocationsService} from '../../../../services/locations.service';
import {type} from 'os';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService,
              private locationService: LocationsService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });

    this.selectedPriceDisplay = 'Night';
    this.selectedSortBy = 'Recommended';
    this.searchHotel = '';
    this.isReadMore = false;

    this.hideStar = 'Hide';
    this.hideFacility = 'Hide';
    this.hideArea = 'Hide';
  }

  checkboxStar: boolean[] = [false, false, false, false, false];
  chekboxArea: boolean[] = [];
  chekboxFacility: boolean[] = [false, false, false, false, false, false, false, false];
  hotelFacility: string[] = ['24 Hour-Frontdesk', 'AC', 'Elevator', 'Parking', 'Restaurant', 'SPA', 'Swimming Pool', 'WiFi'];

  searchHotel: string;

  hideStar: string;
  hideFacility: string;
  hideArea: string;

  hotelData$: Subscription;
  hotelArea$: Subscription;
  hotelData: object[] = [];
  hotelArea: object[] = [];
  hotelTotalRating: number[] = [0, 0, 0, 0, 0];

  selectedPriceDisplay: string;
  selectedSortBy: string;

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

  destination: string;
  startDate: Date;
  endDate: Date;
  room: number;
  guest: number;
  dateDiff: number;

  lastValue: number;
  isReadMore: boolean;

  ngOnInit() {
    this.lastValue = 0;
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

  getHotelData(query) {
    this.hotelData = query.data.GetHotelByLocation;
    this.increaseTotalRating();
  }

  getHotelArea(query) {
    this.hotelArea = query.data.GetCityByProvince;

    for (let i = 0 ; i < this.hotelArea.length ; i++) {
      this.chekboxArea[i] = false;
    }

  }

  goToSearchHotel() {
    this.router.navigateByUrl('Hotel');
  }

  resetAll() {
    this.checkboxStar = [false, false, false, false, false];
    this.chekboxFacility = [false, false, false, false, false, false, false, false];
    this.value = 0;
    this.searchHotel = '';
    this.highValue = 5000000;
    this.lastValue = 0;
  }

  detectChange() {

    if (this.checkboxStar.includes(true) || this.chekboxFacility.includes(true) || this.chekboxArea.includes(true) ||
      this.value !== 0 || this.highValue !== 5000000 || this.searchHotel !== '') {
      this.lastValue = 1;
    } else {
      this.lastValue = 0;
    }
    console.log(this.lastValue);
  }

  openWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone=62895384152587');
  }

  openMap() {
    this.router.navigate(['/Hotel/Map'], {
      queryParams: {
        destination: this.destination,
        startDate: moment(this.startDate).format('MM-DD-YYYY'),
        endDate: moment(this.endDate).format('MM-DD-YYYY'),
        room: this.room,
        guest: this.guest
      }
    });
  }

  changeReadMore() {
    this.isReadMore = true;
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
