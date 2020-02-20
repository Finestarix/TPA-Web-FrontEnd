import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HotelService} from '../../../../services/hotel.service';
import {LocationsService} from '../../../../services/locations.service';
import {Subscription} from 'rxjs';
import {CarService} from '../../../../services/car.service';
import {LabelType, Options} from 'ng5-slider';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private carService: CarService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });

    this.carModel$ = this.carService.getCarModel().subscribe(async query => {
      await this.getCarModelData(query);
    });

    this.hidePassenger = this.hideModel = this.hideBrand = 'Hide';
    this.selectedSortBy = 'Recommended';

    this.searchCar = '';

    this.lastValue = 0;
    this.totalShow = 2;
  }

  passengerData: string[] = ['All', '<5 Passengers', '5-6 Passengers', '>6 Passengers'];
  checkboxPassenger: boolean[] = [false, false, false, false];
  checkboxBrand: boolean[] = [];
  checkboxModel: boolean[] = [];

  carModel$: Subscription;
  carModel: any;
  carModelData: string[] = [];
  carModelBrand: string[] = [];

  carData$: Subscription;
  carData: any;
  carDataShow: any;
  totalShow: number;

  destination: string;
  startDate: Date;
  endDate: Date;
  totalCar: number;
  dateDiff: number;
  searchCar: string;

  selectedSortBy: string;

  value = 0;
  highValue = 1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
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

  lastValue: number;

  hidePassenger: string;
  hideBrand: string;
  hideModel: string;

  ngOnInit() {
  }

  getAllParameterData(params) {

    if (params.destination === undefined) {
      this.router.navigateByUrl('/Car Rental');
      return;
    }

    this.destination = params.destination;
    this.startDate = new Date(params.startDate);
    this.endDate = new Date(params.endDate);
    this.totalCar = params.car;

    this.dateDiff = this.endDate.getDate() - this.startDate.getDate();

    this.carData$ = this.carService.getCarByLocation(this.destination).subscribe(async query => {
      await this.getCarData(query);
    });
  }

  onlyUnique = (value, index, self) => self.indexOf(value) === index;

  getCarModelData(query) {
    this.carModel = query.data.AllCarModel;

    for (const car of this.carModel) {
      this.carModelBrand.push(car.brand);
      this.carModelData.push(car.model);
    }

    this.carModelBrand = this.carModelBrand.filter(this.onlyUnique);
    for (let i = 0 ; i < this.carModelBrand.length ; i++) {
      this.checkboxBrand[i] = false;
    }

    this.carModelData = this.carModelData.filter(this.onlyUnique);
    for (let i = 0 ; i < this.carModelData.length ; i++) {
      this.checkboxModel[i] = false;
    }
  }

  getCarData(query) {
    this.carData = query.data.GetCarByCity;
    this.carDataShow = this.carData.slice(0, this.totalShow);
  }

  goToSearchCar() {
    this.router.navigateByUrl('Car Rental');
  }

  resetAll() {
    this.checkboxPassenger = [false, false, false, false];

    for (let i = 0 ; i < this.checkboxModel.length ; i++) {
      this.checkboxModel[i] = false;
    }

    for (let i = 0 ; i < this.checkboxBrand.length ; i++) {
      this.checkboxBrand[i] = false;
    }

    this.searchCar = '';
  }

  detectChange() {
    if (this.checkboxModel.includes(true) || this.checkboxBrand.includes(true) || this.checkboxPassenger.includes(true)
        || this.searchCar !== '' || this.value !== 0 || this.highValue !== 0) {
      this.lastValue = 1;
    } else {
      this.lastValue = 0;
    }
  }

  changeHideFacility() {
    this.hidePassenger = (this.hidePassenger === 'Show') ? 'Hide' : 'Show';
  }

  changeHideBrand() {
    this.hideBrand = (this.hideBrand === 'Show') ? 'Hide' : 'Show';
  }

  changeHideModel() {
    this.hideModel = (this.hideModel === 'Show') ? 'Hide' : 'Show';
  }

  onScroll() {
    if (this.totalShow <= this.carData.length) {
      this.totalShow += 2;
      this.carDataShow = this.carData.slice(0, this.totalShow);
    }
  }


}
