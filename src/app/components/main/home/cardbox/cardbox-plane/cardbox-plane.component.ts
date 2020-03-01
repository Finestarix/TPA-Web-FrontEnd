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
import {FlightService} from "../../../../../services/flight.service";
import {getAllFlightAirport} from "../../../../../services/queries/flightQuery";
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

  constructor(private flightService: FlightService,
              private router: Router) {
    this.isRoundtrip = false;

    this.passengerDetail.setValue(1);
    this.selectedDetail.setValue('Economy');
    this.departureDate = new FormControl(moment());
    this.returnDate = new FormControl(moment());

    this.flightService.getAllFlightAirport().subscribe(async value => {
      await this.getAllFlightAirport(value)
    })
  }

  selectedLocation1 = new FormControl();
  selectedLocation2 = new FormControl();
  selectedDetail = new FormControl();
  passengerDetail = new FormControl();
  filteredLocation1: Observable<string[]>;
  filteredLocation2: Observable<string[]>;

  isRoundtrip: boolean;

  departureDate: FormControl;
  returnDate: FormControl;

  airportList: any;
  airportListString: string[] = [];

  ngOnInit() {
    this.returnDate.disable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.airportListString.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllFlightAirport(value) {
    this.airportList = value.data.AllFlightAirport;

    for (const aL of this.airportList) {
      this.airportListString.push(aL.name + ' (' + aL.code + ')');
    }

    this.filteredLocation1 = this.selectedLocation1.valueChanges
      .pipe(
        startWith(''),
        map(value1 => this._filter(value1))
      );

    this.filteredLocation2 = this.selectedLocation2.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filter(value2))
      );
  }

  changeStatus() {
    this.isRoundtrip = !this.isRoundtrip;

    if (!this.isRoundtrip) {
      this.returnDate.disable();
    } else if (this.isRoundtrip) {
      this.returnDate.enable();
    }
  }

  searchFlight() {

    const code1 = this.selectedLocation1.value.toString().
      substring(this.selectedLocation1.value.toString().indexOf('(') + 1, this.selectedLocation1.value.toString().indexOf(')'));
    const code2 = this.selectedLocation2.value.toString().
      substring(this.selectedLocation2.value.toString().indexOf('(') + 1, this.selectedLocation2.value.toString().indexOf(')'))

    this.router.navigate(['/Flight/Search'], {
      queryParams: {
        from: code1,
        to: code2,
        startDate: moment(this.departureDate).format('MM-DD-YYYY'),
        endDate: moment(this.returnDate).format('MM-DD-YYYY'),
        passenger: this.passengerDetail.value,
        class: this.selectedDetail.value,
        status: this.isRoundtrip
      }
    });
  }

}

