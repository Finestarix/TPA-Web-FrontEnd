import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {MatDatepickerInputEvent} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {LocationsService} from '../../../../../services/locations.service';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HistoryService} from "../../../../../services/history.service";

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

  constructor(private locationService: LocationsService,
              private router: Router,
              private historyService: HistoryService) {

    this.totalRoom = this.totalGuess = 0;
    this.totalValue = '0 Guess, 0 Room';

    this.checkinDate = new FormControl(moment());
    this.checkoutDate = new FormControl(moment().add(24, 'hours'));
    this.start = this.checkinDate.value;
    this.end = this.checkoutDate.value;
    this.totalNight = 1;

    this.historyStatus = false;

    this.location$ = this.locationService.getLocation().subscribe(async query => {
      await this.afterFetchData(query);
    });
  }

  selectedLocation = new FormControl();
  location$: Subscription;
  location: string[] = [];
  filteredLocation: Observable<string[]>;

  checkinDate: FormControl;
  checkoutDate: FormControl;

  start: Moment;
  end: Moment;
  totalNight: number;

  isShowRoom: boolean;
  totalGuess: number;
  totalRoom: number;
  totalValue: string;

  historyStatus: boolean;

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.location.filter(option => option.toLowerCase().includes(filterValue));
  }

  onlyUnique = (value, index, self) => self.indexOf(value) === index;

  afterFetchData(query) {
    const temp = query.data.AllLocation;

    for (let i = 0; i < temp.length; i++) {
      this.location.push(temp[i].province);
    }

    this.location = this.location.filter(this.onlyUnique)

    this.filteredLocation = this.selectedLocation.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
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
    const currDate = new moment();
    return Math.ceil(moment.duration(date.diff(currDate)).asDays()) >= 0;
  };

  checkoutFilter = (date: Moment): boolean => {
    return Math.ceil(moment.duration(date.diff(this.checkinDate.value)).asDays()) >= 1;
  };

  showRoom(): string {
    return (this.isShowRoom) ? 'block' : 'none';
  }

  setGuess(event) {
    this.totalGuess = event;
    this.totalValue = this.totalGuess + ' Guess, ' + this.totalRoom + ' Room';
  }

  setRoom(event) {
    this.totalRoom = event;
    this.totalValue = this.totalGuess + ' Guess, ' + this.totalRoom + ' Room';
  }

  searchHotel() {
    if (this.selectedLocation.value === null) {
      alert('Please Input Destination !');
      return;
    } else if (this.totalNight <= 0) {
      alert('Please Input Valid Check-In and Check-Out Date !');
      return;
    } else if (this.totalRoom === 0 || this.totalGuess === 0) {
      alert('Please Input Valid Guess and Room !');
      return;
    }

    const passObject = {
      hotel: {
        destination: this.selectedLocation.value,
        startDate: moment(this.start).format('MM-DD-YYYY'),
        endDate: moment(this.end).format('MM-DD-YYYY'),
        room: this.totalRoom,
        guest: this.totalGuess
      }
    };

    this.historyService.setSession(passObject);

    this.router.navigate(['/Hotel/Search'], {
      queryParams: {
        destination: this.selectedLocation.value,
        startDate: moment(this.start).format('MM-DD-YYYY'),
        endDate: moment(this.end).format('MM-DD-YYYY'),
        room: this.totalRoom,
        guest: this.totalGuess
      }
    });
  }

  setData(event) {
    const allHotelHistory = JSON.parse(this.historyService.getSession());
    const currHotelHistory = allHotelHistory[event];

    this.selectedLocation.setValue(currHotelHistory.hotel.destination);
    this.checkinDate.setValue(new Date(currHotelHistory.hotel.startDate));
    this.checkoutDate.setValue(new Date(currHotelHistory.hotel.endDate));
    this.totalRoom = currHotelHistory.hotel.room;
    this.totalGuess = currHotelHistory.hotel.guest;
    this.totalValue = this.totalGuess + ' Guess, ' + this.totalRoom + ' Room';
  }

}
