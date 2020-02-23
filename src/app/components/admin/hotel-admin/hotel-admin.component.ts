import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HotelService} from '../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import {DialogErrorComponent} from '../core/dialog-error/dialog-error.component';
import {InsertHotelAdminComponent} from "./insert-hotel-admin/insert-hotel-admin.component";
import {UpdateHotelAdminComponent} from "./update-hotel-admin/update-hotel-admin.component";

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.scss']
})
export class HotelAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataHotel$: Subscription;
  dataHotel: any;

  dataHotelDelete$: Subscription;

  allColumns = ['image', 'name', 'rating', 'address', 'city', 'province', 'facility', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;
  private dialogInsertRef: MatDialogRef<InsertHotelAdminComponent>;
  private dialogUpdateRef: MatDialogRef<UpdateHotelAdminComponent>;

  constructor(private hotelService: HotelService,
              private dialogInsert: MatDialog,
              private dialogUpdate: MatDialog,
              private dialogConfirm: MatDialog,
              private dialogError: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getHotelData();
  }

  getHotelData() {
    this.dataHotel$ = this.hotelService.getAllHotel().subscribe(async query => {
      await this.fetchHotelData(query);
    });
  }

  setDataSource(hotels: object[]) {
    this.dataSource = new MatTableDataSource(hotels);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchHotelData(query) {
    this.dataHotel = null;
    this.dataHotel = query.data.AllHotel;

    const hotels: HotelData[] = [];
    for (const hotel of this.dataHotel) {
      hotels.push(this.createNewHotel(hotel));
    }

    this.setDataSource(hotels);
  }

  createNewHotel(hotel: any): HotelData {

    let facilities = '';

    for (const fac of hotel.facility) {
      facilities += fac.name + ', ';
    }

    facilities = facilities.slice(0, facilities.length - 1);

    return {
      id: hotel.id,
      name: hotel.name,
      rating: hotel.rating,
      address: hotel.address,
      city: hotel.location.city,
      province: hotel.location.province,
      image: hotel.photo[0].source,
      facility: facilities
    };
  }

  removeHotelData(id: number) {
    console.log(id);
    this.dataHotelDelete$ = this.hotelService.deleteHotelByID(id).subscribe(async query => {
      await this.afterRemoveHotelData(query);
    });
  }

  afterRemoveHotelData(query) {
    const currID = query.data.DeleteHotel.id;

    if (currID === 0) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Error Delete Data !'
      });
      return;
    }

    let hotel: any;
    hotel = this.dataSource.data.filter((value, key) => {
      // @ts-ignore
      return value.id !== currID;
    });

    this.setDataSource(hotel);

    this.dialogError.open(DialogErrorComponent, {
      data: 'Success Delete Data !'
    });
    return;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteAction(hotel) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === false) {
        return;
      } else {
        this.removeHotelData(hotel.id);
      }
    });

  }

  updateAction(hotel) {
    this.dialogUpdateRef = this.dialogUpdate.open(UpdateHotelAdminComponent, {
      data: hotel
    });

    this.dialogUpdateRef.afterClosed().subscribe(data => {

    });
  }

  insertAction() {
    this.dialogInsertRef = this.dialogInsert.open(InsertHotelAdminComponent);

    this.dialogInsertRef.afterClosed().subscribe(data => {

    });
  }
}

export interface HotelData {
  id: number;
  name: string;
  rating: string;
  province: string;
  city: string;
  address: string;
  image: string;
  facility: string;
}
