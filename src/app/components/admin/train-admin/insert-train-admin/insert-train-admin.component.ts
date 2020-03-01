import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HotelService} from '../../../../services/hotel.service';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {TrainData} from '../../../../models/train-interface';
import {TrainService} from '../../../../services/train.service';

@Component({
  selector: 'app-insert-train-admin',
  templateUrl: './insert-train-admin.component.html',
  styleUrls: ['./insert-train-admin.component.scss']
})
export class InsertTrainAdminComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InsertTrainAdminComponent>,
              private dialogError: MatDialog,
              private trainService: TrainService) {
    this.isDisable = false;
  }

  selectedClass: string[] = [];
  allClass: string[] = ['Economy', 'Executive', 'Business'];

  isDisable: boolean;

  nameFormControl: FormControl = new FormControl();
  codeFormControl: FormControl = new FormControl();
  arrivalFormControl: FormControl = new FormControl();
  arrivalTimeFormControl: FormControl = new FormControl();
  arrivalDateFormControl: FormControl = new FormControl();
  departureFormControl: FormControl = new FormControl();
  departureTimeFormControl: FormControl = new FormControl();
  departureDateFormControl: FormControl = new FormControl();
  transitFormControl: FormControl = new FormControl();
  seatFormControl: FormControl = new FormControl();
  priceFormControl: FormControl = new FormControl();
  classFormControl: FormControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
  }

  insertTrain() {

    console.log(this.transitFormControl.value);

    if (this.nameFormControl.invalid || this.codeFormControl.invalid
      || this.priceFormControl.invalid || this.seatFormControl.invalid
      || this.arrivalDateFormControl.invalid || this.arrivalTimeFormControl.invalid
      || this.departureDateFormControl.invalid || this.departureTimeFormControl.invalid
      || this.departureFormControl.invalid || this.arrivalFormControl.invalid) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    this.isDisable = true;

    const arrivalDate = new Date(this.arrivalDateFormControl.value);
    arrivalDate.setHours(arrivalDate.getHours() + 7);
    const arrivalTime = arrivalDate.toISOString().substr(0, 11) + this.arrivalTimeFormControl.value + ':00Z';

    const departureDate = new Date(this.departureDateFormControl.value);
    departureDate.setHours(departureDate.getHours() + 7);
    const departureTime = departureDate.toISOString().substr(0, 11) + this.departureTimeFormControl.value + ':00Z';

    const transitString = (this.transitFormControl.value === null) ? '' : this.transitFormControl.value;

    const newTrain: TrainData = {
      departureName: this.departureFormControl.value,
      arrivalName: this.arrivalFormControl.value,
      price: this.priceFormControl.value,
      nameCode: this.nameFormControl.value + ',' + this.codeFormControl.value,
      transit: transitString,
      class: this.classFormControl.value,
      seat: this.seatFormControl.value,
      id: 0,
      departureTime: departureTime,
      arrivalTime: arrivalTime
    };

    console.log(newTrain.transit);

    this.trainService.insertNewTrain(newTrain).subscribe(async value => {
      await this.dialogRef.close();
    });
  }

}
