import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Moment} from 'moment';
import {HotelService} from '../../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {LabelType, Options} from 'ng5-slider';
import * as moment from 'moment';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });

    this.selectedPriceDisplay = 'Night';
    this.selectedSortBy = 'Recommended';
    this.searchHotel = '';
  }

  checkboxStar: boolean[] = [false, false, false, false, false];
  chekboxFacility: boolean[] = [false, false, false, false, false, false, false, false];
  hotelFacility: string[] = ['24 Hour-Frontdesk', 'AC', 'Elevator', 'Parking', 'Restaurant', 'SPA', 'Swimming Pool', 'WiFi'];

  searchHotel: string;

  hotelData$: Subscription;
  hotelData: object[] = [];
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
  startDate: Moment;
  endDate: Moment;
  room: number;
  guest: number;

  lastValue: number;

  ngOnInit() {
    this.lastValue = 0;
  }

  getAllParameterData(params) {

    if (params.destination === undefined) {
      this.router.navigateByUrl('/Hotel');
      return;
    }

    this.destination = params.destination;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.room = params.room;
    this.guest = params.guest;

    this.hotelData$ = this.hotelService.getHotelByCity(this.destination).subscribe(async query => {
      await this.getHotelData(query);
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
    if (this.checkboxStar.includes(true) || this.chekboxFacility.includes(true) ||
      this.value !== 0 || this.highValue !== 5000000 || this.searchHotel !== '') {
      this.lastValue = 1;
    } else {
      this.lastValue = 0;
    }
  }
}
