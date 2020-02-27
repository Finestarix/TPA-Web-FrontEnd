import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TrainService} from '../../../../services/train.service';
import {FlightService} from '../../../../services/flight.service';
import {FlightData} from '../../../../models/flight-interface';

@Component({
  selector: 'app-insert-flight-admin',
  templateUrl: './insert-flight-admin.component.html',
  styleUrls: ['./insert-flight-admin.component.scss']
})
export class InsertFlightAdminComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InsertFlightAdminComponent>,
              private dialogError: MatDialog,
              private flightService: FlightService) {
    this.isDisable = false;
  }

  nameFormControl: FormControl = new FormControl();
  modelFormControl: FormControl = new FormControl();
  arrivalFormControl: FormControl = new FormControl();
  arrivalTimeFormControl: FormControl = new FormControl();
  arrivalDateFormControl: FormControl = new FormControl();
  departureFormControl: FormControl = new FormControl();
  departureTimeFormControl: FormControl = new FormControl();
  departureDateFormControl: FormControl = new FormControl();
  transitFormControl: FormControl = new FormControl();
  priceFormControl: FormControl = new FormControl();

  isDisable: boolean;

  ngOnInit() {
  }

  insertFlight() {

    const arrivalDate = new Date(this.arrivalDateFormControl.value);
    const arrivalTime = arrivalDate.toISOString().substr(0, 11) + this.arrivalTimeFormControl.value + ':00Z';

    const departureDate = new Date(this.departureDateFormControl.value);
    const departureTime = departureDate.toISOString().substr(0, 11) + this.departureTimeFormControl.value + ':00Z';

    const transitChecked = this.transitFormControl.value === null ? '' : this.transitFormControl.value;

    const flight: FlightData = {
      id: 0,
      companyName: this.nameFormControl.value,
      companyIcon: '',
      model: this.modelFormControl.value,
      price: this.priceFormControl.value,
      transit: transitChecked,
      from: this.arrivalFormControl.value,
      to: this.departureFormControl.value,
      departDate: departureTime,
      arriveDate: arrivalTime,
      timeline: '',
      duration: ''
    };

    this.flightService.insertFlight(flight).subscribe(async query => {
      await this.dialogRef.close();
    });
  }
}
