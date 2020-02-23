import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HotelService} from '../../../../services/hotel.service';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {HotelData} from '../../../../models/hotel-interface';
import * as moment from "moment";

@Component({
  selector: 'app-update-hotel-admin',
  templateUrl: './update-hotel-admin.component.html',
  styleUrls: ['./update-hotel-admin.component.scss']
})
export class UpdateHotelAdminComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<UpdateHotelAdminComponent>,
              private dialogError: MatDialog,
              private hotelService: HotelService) {
    this.isDisable = false;

    this.nameFormControl.setValue(data.name);
    this.ratingFormControl.setValue(data.rating);
    this.priceFormControl.setValue(data.price);
    this.informationFormControl.setValue(data.information);

    // let tempFac = data.facility.split(',');
    // tempFac = tempFac.filter(value => {
    //   return value !== '';
    // });
    // this.selectedFacility = tempFac;
  }

  isDisable: boolean;

  selectedFacility: string[] = [];
  allFacility: string[] = ['24 Hour-Frontdesk', 'AC', 'Elevator', 'Parking', 'Restaurant', 'SPA', 'Swimming Pool', 'WiFi'];

  nameFormControl: FormControl = new FormControl();
  ratingFormControl: FormControl = new FormControl();
  priceFormControl: FormControl = new FormControl();
  facilityFormControl: FormControl = new FormControl();
  informationFormControl: FormControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value === '') {
      return;
    }

    let flagFac = false;
    for (const fac of this.allFacility) {
      if (fac === value) {
        flagFac = true;
        break;
      }
    }
    if (!flagFac) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Wrong Facility'
      });
      return;
    }

    for (const fac of this.selectedFacility) {
      if (fac === value) {
        flagFac = false;
        break;
      }
    }
    if (!flagFac) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Duplicate Facility'
      });
      return;
    }

    this.selectedFacility.push(value.trim());
    this.facilityFormControl.setValue(null);
  }

  remove(facility: string): void {
    const index = this.selectedFacility.indexOf(facility);
    if (index >= 0) {
      this.selectedFacility.splice(index, 1);
    }
  }

  updateHotel() {

    this.isDisable = true;

    const newHotel: HotelData = {
      address: this.data.address,
      city: this.data.city,
      facility: '',
      id: this.data.id,
      image: '',
      information: this.informationFormControl.value,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.nameFormControl.value,
      price: this.priceFormControl.value,
      province: '',
      rating: this.ratingFormControl.value,
    };

    this.hotelService.updateHotel(newHotel).subscribe(async value => {
      await this.updateFacility(value);
    });

  }

  updateFacility(value) {

    for (const fas of this.selectedFacility) {
      this.hotelService.insertHotelFacility(value.data.UpdateHotel.id, fas).subscribe( value1 => {
      });
    }

    this.dialogRef.close({
      dataHotel: value.data.UpdateHotel,
    });
  }
}
