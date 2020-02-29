import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {LocationsService} from '../../../../../services/locations.service';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {type} from 'os';

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
  selector: 'app-cardbox-plane',
  templateUrl: './cardbox-plane.component.html',
  styleUrls: ['./cardbox-plane.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CardboxPlaneComponent implements OnInit {

  constructor(private http: HttpClient,
              private locationService: LocationsService) {
    this.isRoundtrip = false;

    this.departureDate = new FormControl(moment());
    this.returnDate = new FormControl(moment());

    // this.location$ = this.locationService.getLocation().subscribe( async query => {
    //   await this.afterFetchData(query);
    // });
  }

  // selectedLocation1 = new FormControl();
  // selectedLocation2 = new FormControl();
  // location$: Subscription;
  // location: string[] = [];
  // filteredLocation1: Observable<string[]>;
  // filteredLocation2: Observable<string[]>;

  isRoundtrip: boolean;

  departureDate: FormControl;
  returnDate: FormControl;

  ngOnInit() {
    this.returnDate.disable();
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.location.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // afterFetchData(query) {
  //   const temp = query.data.AllLocation;

    // for (let i = 0 ; i < temp.length ; i++) {
    //   this.location.push(temp[i].city);
    // }

    // this.filteredLocation1 = this.selectedLocation1.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    //
    // this.filteredLocation2 = this.selectedLocation2.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  // }

  departureFilter = (date: Moment): boolean => {
    const currDate = new Date();

    return date.date() >= currDate.getDate() &&
      date.month() >= currDate.getMonth() &&
      date.year() >= currDate.getFullYear();
  };

  returnFilter = (date: Moment): boolean => {
    return date.date() >= this.departureDate.value.date() &&
      date.month() >= this.departureDate.value.month() &&
      date.year() >= this.departureDate.value.year();
  };

  changeStatus() {
    this.isRoundtrip = !this.isRoundtrip;

    if (!this.isRoundtrip) {
      this.returnDate.disable();
    } else if (this.isRoundtrip) {
      this.returnDate.enable();
    }
  }
}

