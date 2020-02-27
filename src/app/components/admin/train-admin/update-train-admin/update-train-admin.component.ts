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

  addClass(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value === '') {
      return;
    }

    let flagClass = false;
    for (const fac of this.allClass) {
      if (fac === value) {
        flagClass = true;
        break;
      }
    }
    if (!flagClass) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Wrong Class'
      });
      return;
    }

    for (const fac of this.selectedClass) {
      if (fac === value) {
        flagClass = false;
        break;
      }
    }
    if (!flagClass) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Duplicate Class'
      });
      return;
    }

    this.selectedClass.push(value.trim());
    this.classFormControl.setValue(null);
  }

  removeClass(type: string): void {
    const index = this.selectedClass.indexOf(type);
    if (index >= 0) {
      this.selectedClass.splice(index, 1);
    }
  }

  insertTrain() {
    this.isDisable = true;

    const arrivalDate = new Date(this.arrivalDateFormControl.value);
    const arrivalTime = arrivalDate.toISOString().substr(0, 11) + this.arrivalTimeFormControl.value + ':00Z';

    const departureDate = new Date(this.departureDateFormControl.value);
    const departureTime = departureDate.toISOString().substr(0, 11) + this.departureTimeFormControl.value + ':00Z';

    const newTrain: TrainData = {
      departureName: '',
      arrivalName: '',
      price: this.priceFormControl.value,
      nameCode: '',
      transit: '',
      class: '',
      seat: this.seatFormControl.value,
      id: this.data.id,
      departureTime: arrivalTime,
      arrivalTime: departureTime
    };

    this.trainService.updateTrain(newTrain).subscribe(async value => {
      await this.insertClass(value);
    });
  }

  insertClass(value) {
    for (const cls of this.selectedClass) {
      this.trainService.insertNewTrainClass(value.data.InsertNewTrain.id, cls).subscribe();
    }

    this.dialogRef.close();
  }

}
