import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {MatDatepickerInputEvent} from '@angular/material';

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

  constructor() {
    this.isOneWay = false;
    this.isRoundtrip = false;
    this.departureDate = this.returnDate = moment();
  }

  isOneWay: boolean;
  isRoundtrip: boolean;

  departureDate: Moment;
  returnDate: Moment;

  ngOnInit() {
  }

  addDepartureEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // @ts-ignore
    this.departureDate = event.value;
  }

  addReturnEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // @ts-ignore
    this.returnDate = event.value;
  }

  departureFilter = (date: Moment): boolean => {
    const currDate = new Date();

    return date.date() >= currDate.getDate() &&
      date.month() >= currDate.getMonth() &&
      date.year() >= currDate.getFullYear();
  }

  returnFilter = (date: Moment): boolean => {
    return date.date() >= this.departureDate.date() &&
      date.month() >= this.departureDate.month() &&
      date.year() >= this.departureDate.year();
  }

  changeStatus() {
    this.isRoundtrip = !this.isRoundtrip;
  }
}
