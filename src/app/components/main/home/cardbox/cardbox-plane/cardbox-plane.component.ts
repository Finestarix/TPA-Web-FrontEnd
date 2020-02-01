import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
export class CardboxPlaneComponent implements OnInit, AfterViewInit {

  constructor() {
    this.isOneWay = false;
    this.isRoundtrip = false;

    this.departureDate = new FormControl(moment());
    this.returnDate = new FormControl(moment());
  }

  isOneWay: boolean;
  isRoundtrip: boolean;

  form: FormControl;
  departureDate: FormControl;
  returnDate: FormControl;

  ngOnInit() {
    this.returnDate.disable();
  }

  ngAfterViewInit() {
  }

  departureFilter = (date: Moment): boolean => {
    const currDate = new Date();

    return date.date() >= currDate.getDate() &&
      date.month() >= currDate.getMonth() &&
      date.year() >= currDate.getFullYear();
  }

  returnFilter = (date: Moment): boolean => {
    return date.date() >= this.departureDate.value.date() &&
      date.month() >= this.departureDate.value.month() &&
      date.year() >= this.departureDate.value.year();
  }

  changeStatus() {
    this.isRoundtrip = !this.isRoundtrip;

    if (!this.isRoundtrip ) {
      this.returnDate.disable();
    } else if (this.isRoundtrip) {
      this.returnDate.enable();
    }
  }
}
