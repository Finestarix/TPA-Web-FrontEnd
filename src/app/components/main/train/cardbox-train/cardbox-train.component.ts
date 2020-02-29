import { Component, OnInit } from '@angular/core';
import {TrainService} from "../../../../services/train.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-cardbox-train',
  templateUrl: './cardbox-train.component.html',
  styleUrls: ['./cardbox-train.component.scss']
})
export class CardboxTrainComponent implements OnInit {

  constructor(private trainService: TrainService) {
    this.trainService.getAllTrainStation().subscribe(async value => {
      await this.getAllTrainStation(value.data.AllTrainStation);
    });
  }

  private sourceFormControl: FormControl = new FormControl();
  private destinationFormControl: FormControl = new FormControl();
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

}
