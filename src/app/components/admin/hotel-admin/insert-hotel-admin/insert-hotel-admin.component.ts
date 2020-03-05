import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {HotelService} from '../../../../services/hotel.service';
import {HotelData} from '../../../../models/hotel-interface';
import {log} from "util";
import {ChatService} from "../../../../services/chat.service";

@Component({
  selector: 'app-insert-hotel-admin',
  templateUrl: './insert-hotel-admin.component.html',
  styleUrls: ['./insert-hotel-admin.component.scss']
})
export class InsertHotelAdminComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InsertHotelAdminComponent>,
              private dialogError: MatDialog,
              private chatService: ChatService,
              private hotelService: HotelService) {
    this.isDisable = false;
  }

  isDisable: boolean;

  selectedFacility: string[] = [];
  selectedType: string[] = [];
  allFacility: string[] = ['24 Hour-Frontdesk', 'AC', 'Elevator', 'Parking', 'Restaurant', 'SPA', 'Swimming Pool', 'WiFi'];
  allType: string[] = ['Normal', 'Deluxe', 'Premium'];

  nameFormControl: FormControl = new FormControl();
  ratingFormControl: FormControl = new FormControl();
  addressFormControl: FormControl = new FormControl();
  cityFormControl: FormControl = new FormControl();
  priceFormControl: FormControl = new FormControl();
  latitudeFormControl: FormControl = new FormControl();
  longitudeFormControl: FormControl = new FormControl();
  facilityFormControl: FormControl = new FormControl();
  typeFormControl: FormControl = new FormControl();
  informationFormControl: FormControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
  }

  addFac(event: MatChipInputEvent): void {
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

  removeFac(type: string): void {
    const index = this.selectedFacility.indexOf(type);
    if (index >= 0) {
      this.selectedFacility.splice(index, 1);
    }
  }

  addTyp(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value === '') {
      return;
    }

    let flagFac = false;
    for (const fac of this.allType) {
      if (fac === value) {
        flagFac = true;
        break;
      }
    }
    if (!flagFac) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Wrong Type'
      });
      return;
    }

    for (const fac of this.selectedType) {
      if (fac === value) {
        flagFac = false;
        break;
      }
    }
    if (!flagFac) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Duplicate Type'
      });
      return;
    }

    this.selectedType.push(value.trim());
    this.typeFormControl.setValue(null);
  }

  removeTyp(type: string): void {
    const index = this.selectedType.indexOf(type);
    if (index >= 0) {
      this.selectedType.splice(index, 1);
    }
  }

  insertHotel() {

    if (this.addressFormControl.invalid || this.cityFormControl.invalid
      || this.informationFormControl.invalid || this.latitudeFormControl.invalid
      || this.longitudeFormControl.invalid || this.nameFormControl.invalid
      || this.priceFormControl.invalid || this.ratingFormControl.invalid) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    this.isDisable = true;

    const newHotel: HotelData = {
      address: this.addressFormControl.value,
      city: this.cityFormControl.value,
      facility: '',
      id: 0,
      image: '',
      information: this.informationFormControl.value,
      latitude: this.latitudeFormControl.value,
      longitude: this.longitudeFormControl.value,
      name: this.nameFormControl.value,
      price: this.priceFormControl.value,
      province: '',
      rating: this.ratingFormControl.value,
      type: ''
    };

    this.hotelService.insertHotel(newHotel).subscribe(async value => {
      await this.insertFacility(value);
    });

  }

  insertFacility(value) {

    for (const fas of this.selectedFacility) {
      this.hotelService.insertHotelFacility(value.data.InsertNewHotel.id, fas).subscribe();
    }

    for (const typ of this.selectedType) {
      this.hotelService.insertHotelType(value.data.InsertNewHotel.id, typ).subscribe();
    }

    this.dialogRef.close({
      dataHotel: value.data.InsertNewHotel.id,
    });
  }

}
