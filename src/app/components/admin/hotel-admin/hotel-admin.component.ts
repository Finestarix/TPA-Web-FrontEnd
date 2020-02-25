import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HotelService} from '../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import {DialogErrorComponent} from '../core/dialog-error/dialog-error.component';
import {InsertHotelAdminComponent} from './insert-hotel-admin/insert-hotel-admin.component';
import {UpdateHotelAdminComponent} from './update-hotel-admin/update-hotel-admin.component';
import {HotelData} from '../../../models/hotel-interface';
import DateTimeFormat = Intl.DateTimeFormat;
import * as moment from 'moment';


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
  dataHotelArr: HotelData[] = [];

  dataHotelDelete$: Subscription;

  allColumns = ['image', 'name', 'rating', 'address', 'city', 'province', 'information', 'type', 'facility', 'update', 'delete'];
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

  setDataSource(hotels: object[]) {
    this.dataSource = new MatTableDataSource(hotels);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getHotelData() {
    this.dataHotelArr = [];
    this.dataHotel$ = this.hotelService.getAllHotel().subscribe(async query => {
      await this.fetchHotelData(query);
    });
  }

  fetchHotelData(query) {
    this.dataHotel = query.data.AllHotel;

    for (const hotel of this.dataHotel) {
      this.dataHotelArr.push(this.createNewHotel(hotel));
    }

    this.setDataSource(this.dataHotelArr);
    this.dataHotel$.unsubscribe();
  }

  createNewHotel(hotel: any): HotelData {

    let facilities = '';
    for (const fac of hotel.facility) {
      facilities += fac.name + ', ';
    }
    facilities = facilities.substring(0, facilities.length - 2);

    let types = '';
    for (const typ of hotel.type) {
      types += typ.name + ', ';
    }
    types = types.substring(0, types.length - 2);

    let imageShow: string;
    if (hotel.photo.length === 0) {
      imageShow = 'no-image.png';
    } else {
      imageShow = hotel.photo[0].source;
    }

    return {
      id: hotel.id,
      name: hotel.name,
      rating: hotel.rating,
      address: hotel.address,
      city: hotel.location.city,
      province: hotel.location.province,
      image: imageShow,
      facility: facilities,
      information: hotel.information,
      longitude: hotel.longitude,
      latitude: hotel.latitude,
      price: hotel.price,
      type: types,
    };
  }

  insertAction() {
    this.dialogInsertRef = this.dialogInsert.open(InsertHotelAdminComponent);

    this.dialogInsertRef.afterClosed().subscribe(data => {
      this.hotelService.getHotelByID(data.dataHotel).subscribe(async data2 => {
        await this.afterInsertHotelData(data2);
      });
    });

  }

  afterInsertHotelData(data) {
    const newHotel = data.data.GetHotelByID;
    this.dataHotelArr.push(this.createNewHotel(newHotel));
    this.setDataSource(this.dataHotelArr);
  }

  updateAction(hotel) {
    this.dialogUpdateRef = this.dialogUpdate.open(UpdateHotelAdminComponent, {data: hotel});

    this.dialogUpdateRef.afterClosed().subscribe(async data => {
      await this.afterUpdateHotelData(data);
    });

  }

  afterUpdateHotelData(data) {
    if (data === undefined) {
      return;
    }

    this.getHotelData();
  }

  deleteAction(hotel) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.dataHotelDelete$ = this.hotelService.deleteHotelByID(hotel.id).subscribe(async query => {
          await this.afterRemoveHotelData(query);
        });
      } else {
        return;
      }
    });

  }

  afterRemoveHotelData(query) {
    this.getHotelData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
