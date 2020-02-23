import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-insert-hotel-admin',
  templateUrl: './insert-hotel-admin.component.html',
  styleUrls: ['./insert-hotel-admin.component.scss']
})
export class InsertHotelAdminComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InsertHotelAdminComponent>) { }

  ngOnInit() {
  }

}
