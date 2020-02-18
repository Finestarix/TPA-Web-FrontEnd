import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {MatDatepickerInputEvent} from '@angular/material';
import {Observable, Subscription} from "rxjs";
import {LocationsService} from "../../../../../services/locations.service";
import {map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cardbox-car',
  templateUrl: './cardbox-car.component.html',
  styleUrls: ['./cardbox-car.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CardboxCarComponent implements OnInit {

  constructor(private locationService: LocationsService,
              private router: Router) {
    this.tempHelp = 0;
    this.totalCar = 0;
    this.startDate = new FormControl(moment());
    this.endDate = new FormControl(moment());
    this.setTotalDay();

    this.location$ = this.locationService.getLocation().subscribe(async query => {
      await this.afterFetchData(query);
    });
  }

  selectedLocation = new FormControl();
  startDate: FormControl;
  endDate: FormControl;
  totalCar: number;
  filteredLocation: Observable<string[]>;

  location$: Subscription;
  location: string[] = [];

  start: Moment;
  end: Moment;

  totalDay: number;
  tempHelp: number;

  ngOnInit() {
  }

  onlyUnique = (value, index, self) => self.indexOf(value) === index;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.location.filter(option => option.toLowerCase().includes(filterValue));
  }

  afterFetchData(query) {
    const temp = query.data.AllLocation;

    for (let i = 0; i < temp.length; i++) {
      this.location.push(temp[i].province);
    }

    this.location = this.location.filter(this.onlyUnique);

    this.filteredLocation = this.selectedLocation.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  setTotalDay() {
    this.start = this.startDate.value;
    this.end = this.endDate.value;
    this.totalDay = Math.ceil(moment.duration(this.end.diff(this.start)).asDays()) + this.tempHelp;
    this.tempHelp = 1;
  }

  addStartEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setTotalDay();
  }

  addEndEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setTotalDay();
  }

  startDateFilter = (date: Moment): boolean => {
    const currDate = new Date();

    return date.date() >= currDate.getDate() &&
      date.month() >= currDate.getMonth() &&
      date.year() >= currDate.getFullYear();
  };

  endDateFilter = (date: Moment): boolean => {
    return date.date() >= this.startDate.value.date() &&
      date.month() >= this.startDate.value.month() &&
      date.year() >= this.startDate.value.year();
  };

  searchCar() {
    if (this.selectedLocation.value === null) {
      alert('Please Input Destination !');
      return;
    } else if (this.totalDay <= 0) {
      alert('Please Input Valid Check-In and Check-Out Date !');
      return;
    } else if (this.totalCar === 0) {
      alert('Please Input Valid Total Car !');
      return;
    }

    this.router.navigate(['/Car Rental/Search'], {
      queryParams: {
        destination: this.selectedLocation.value,
        startDate: moment(this.start).format('MM-DD-YYYY'),
        endDate: moment(this.end).format('MM-DD-YYYY'),
        car: this.totalCar,
      }
    });
  }
}
