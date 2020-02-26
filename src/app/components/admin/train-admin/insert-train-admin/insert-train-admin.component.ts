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
      departureName: this.departureFormControl.value,
      arrivalName: this.arrivalFormControl.value,
      price: this.priceFormControl.value,
      nameCode: this.nameFormControl.value + ',' + this.codeFormControl.value,
      transit: this.transitFormControl.value,
      class: '',
      seat: this.seatFormControl.value,
      id: 0,
      departureTime: arrivalTime,
      arrivalTime: departureTime
    };

    this.trainService.insertNewTrain(newTrain).subscribe(async value => {
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
