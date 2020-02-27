import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FlightService} from '../../../../services/flight.service';
import {FormControl} from '@angular/forms';
import {FlightData} from '../../../../models/flight-interface';

@Component({
  selector: 'app-update-flight-admin',
  templateUrl: './update-flight-admin.component.html',
  styleUrls: ['./update-flight-admin.component.scss']
})
export class UpdateFlightAdminComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<UpdateFlightAdminComponent>,
              private dialogError: MatDialog,
              private flightService: FlightService) {
    this.isDisable = false;
  }

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

  updateFlight() {

    const arrivalDate = new Date(this.arrivalDateFormControl.value);
    const arrivalTime = arrivalDate.toISOString().substr(0, 11) + this.arrivalTimeFormControl.value + ':00Z';

    const departureDate = new Date(this.departureDateFormControl.value);
    const departureTime = departureDate.toISOString().substr(0, 11) + this.departureTimeFormControl.value + ':00Z';

    const transitChecked = this.transitFormControl.value === null ? '' : this.transitFormControl.value;

    const flight: FlightData = {
      id: this.data.id,
      companyName: '',
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

    this.flightService.updateFlight(flight).subscribe(async query => {
      await this.dialogRef.close();
    });
  }
}
