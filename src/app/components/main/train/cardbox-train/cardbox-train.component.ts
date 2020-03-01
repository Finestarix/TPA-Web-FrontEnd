import { Component, OnInit } from '@angular/core';
import {TrainService} from '../../../../services/train.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogErrorComponent} from '../../../admin/core/dialog-error/dialog-error.component';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-cardbox-train',
  templateUrl: './cardbox-train.component.html',
  styleUrls: ['./cardbox-train.component.scss']
})
export class CardboxTrainComponent implements OnInit {

  constructor(private trainService: TrainService,
              private errorDialog: MatDialog,
              private router: Router) {
    this.sourceFormControl.setValue('');
    this.destinationFormControl.setValue('');
    this.adultFormControl.setValue(1);
    this.infantFormControl.setValue(1);
    this.trainService.getAllTrainStation().subscribe(async value => {
      await this.getAllTrainStation(value.data.AllTrainStation);
    });
  }

  private sourceFormControl: FormControl = new FormControl();
  private destinationFormControl: FormControl = new FormControl();
  private adultFormControl: FormControl = new FormControl();
  private infantFormControl: FormControl = new FormControl();
  private departureDateFormControl = new FormControl(new Date());
  private arrivalDateFormControl = new FormControl(new Date());

  stationList: string[] = [];
  filteredSourceStationList: Observable<string[]>;
  filteredDestinationStationList: Observable<string[]>;

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stationList.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllTrainStation(value) {
    for (const val of value) {
      this.stationList.push(val.name + '(' + val.code + ')');
    }

    this.filteredSourceStationList = this.sourceFormControl.valueChanges.pipe(
      startWith(''),
      map(station => this._filter(station))
    );

    this.filteredDestinationStationList = this.destinationFormControl.valueChanges.pipe(
      startWith(''),
      map(station => this._filter(station))
    );
  }

  searchTrain() {

    if (this.sourceFormControl.value === '' || this.destinationFormControl.value === '') {
      this.errorDialog.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    this.router.navigate(['/Train/Search'], {
      queryParams: {
        source: this.sourceFormControl.value.toString().
                  substring(0, this.sourceFormControl.value.toString().indexOf('(')),
        destination: this.destinationFormControl.value.toString().
                  substring(0, this.destinationFormControl.value.toString().indexOf('(')),
        adult: this.adultFormControl.value,
        infant: this.infantFormControl.value,
        departure: moment(this.departureDateFormControl.value).format('MM-DD-YYYY'),
        arrival: moment(this.arrivalDateFormControl.value).format('MM-DD-YYYY')
      }
    });
  }

}
