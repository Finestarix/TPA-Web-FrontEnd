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
  selector: 'app-cardbox-hotel',
  templateUrl: './cardbox-hotel.component.html',
  styleUrls: ['./cardbox-hotel.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CardboxHotelComponent implements OnInit {

  constructor() {
    this.checkinDate = new FormControl(moment());
    this.checkoutDate = new FormControl(moment().add(23, 'hours'));
    this.setTotalNight();
  }

  checkinDate: FormControl;
  checkoutDate: FormControl;

  start: Moment;
  end: Moment;
  totalNight: number;

  ngOnInit() {
  }

  setTotalNight() {
    this.start = this.checkinDate.value;
    this.end = this.checkoutDate.value;
    this.totalNight = Math.ceil(moment.duration(this.end.diff(this.start)).asDays());
  }

  addCheckinEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setTotalNight();
  }

  addCheckoutEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.setTotalNight();
  }

  checkinFilter = (date: Moment): boolean => {
    const currDate = new Date();

    return date.date() >= currDate.getDate() &&
      date.month() >= currDate.getMonth() &&
      date.year() >= currDate.getFullYear();
  }

  checkoutFilter = (date: Moment): boolean => {
    return date.date() > this.checkinDate.value.date() &&
      date.month() >= this.checkinDate.value.month() &&
      date.year() >= this.checkinDate.value.year();
  }

}
