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

  constructor() {
    this.tempHelp = 0;
    this.startDate = new FormControl(moment());
    this.endDate = new FormControl(moment());
    this.setTotalDay();
  }

  startDate: FormControl;
  endDate: FormControl;

  start: Moment;
  end: Moment;

  totalDay: number;
  tempHelp: number;

  ngOnInit() {
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

}
