import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FlightService} from '../../../../services/flight.service';
import {Form, FormControl} from '@angular/forms';
import {FlightData} from '../../../../models/flight-interface';
import {DialogErrorComponent} from "../../core/dialog-error/dialog-error.component";

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
  transitDurationFormControl: FormControl = new FormControl();

  isDisable: boolean;

  ngOnInit() {
  }

  updateFlight() {


    if (this.modelFormControl.invalid || this.arrivalFormControl.invalid ||
      this.arrivalTimeFormControl.invalid || this.arrivalDateFormControl.invalid ||
      this.departureFormControl.invalid || this.departureTimeFormControl.invalid ||
      this.departureDateFormControl.invalid || this.priceFormControl.invalid) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    const arrivalDate = new Date(this.arrivalDateFormControl.value);
    arrivalDate.setHours(arrivalDate.getHours() + 7);
    const arrivalTime = arrivalDate.toISOString().substr(0, 11) + this.arrivalTimeFormControl.value + ':00Z';

    const departureDate = new Date(this.departureDateFormControl.value);
    departureDate.setHours(departureDate.getHours() + 7);
    const departureTime = departureDate.toISOString().substr(0, 11) + this.departureTimeFormControl.value + ':00Z';

    const transitChecked = this.transitFormControl.value === null ? '' : this.transitFormControl.value;
    const transitCheckedDur = this.transitDurationFormControl.value === null ? 0 : this.transitDurationFormControl.value;

    const flight: FlightData = {
      id: this.data.id,
      companyName: '',
      companyIcon: '',
      transitDuration: transitCheckedDur,
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
