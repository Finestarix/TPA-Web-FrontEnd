import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TrainService} from '../../../../services/train.service';
import {TrainData} from '../../../../models/train-interface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update-train-admin',
  templateUrl: './update-train-admin.component.html',
  styleUrls: ['./update-train-admin.component.scss']
})
export class UpdateTrainAdminComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<UpdateTrainAdminComponent>,
              private dialogError: MatDialog,
              private trainService: TrainService) {

  }

  selectedClass: string[] = [];
  allClass: string[] = ['Economy', 'Executive', 'Business'];

  isDisable: boolean;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  arrivalTimeFormControl: FormControl = new FormControl();
  arrivalDateFormControl: FormControl = new FormControl();
  departureTimeFormControl: FormControl = new FormControl();
  departureDateFormControl: FormControl = new FormControl();
  seatFormControl: FormControl = new FormControl();
  priceFormControl: FormControl = new FormControl();
  classFormControl: FormControl = new FormControl();

  ngOnInit() {
  }
  updateTrain() {

    if (this.priceFormControl.invalid || this.seatFormControl.invalid
      || this.arrivalDateFormControl.invalid || this.arrivalTimeFormControl.invalid
      || this.departureDateFormControl.invalid || this.departureTimeFormControl.invalid) {
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

    const newTrain: TrainData = {
      departureName: '',
      arrivalName: '',
      price: this.priceFormControl.value,
      nameCode: '',
      class: this.classFormControl.value,
      transit: '',
      seat: this.seatFormControl.value,
      id: this.data.id,
      departureTime: arrivalTime,
      arrivalTime: departureTime
    };

    this.trainService.updateTrain(newTrain).subscribe(async value => {
      await this.dialogRef.close();
    });
  }

}
