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
    this.dataHotel = query.data.AllHotel;

    for (const hotel of this.dataHotel) {
      this.dataHotelArr.push(this.createNewHotel(hotel));
    }

    this.setDataSource(this.dataHotelArr);
  }

  createNewHotel(hotel: any): HotelData {

    let facilities = '';

    for (const fac of hotel.facility) {
      facilities += fac.name + ', ';
    }

    facilities = facilities.slice(0, facilities.length - 1);

    let imageShow: string;
    if (hotel.photo !== undefined) {
      if (hotel.photo.length === 0) {
        imageShow = 'no-image.png';
      } else {
        imageShow = hotel.photo[0].source;
      }
    } else {
      imageShow = 'no-image.png';
    }

    let cityShow: string;
    if (hotel.location === undefined) {
      cityShow = hotel.city;
    } else {
      cityShow = hotel.location.city;
    }

    let provinceShow: string;
    if (hotel.location === undefined) {
      provinceShow = hotel.province;
    } else {
      provinceShow = hotel.location.province;
    }

    return {
      id: hotel.id,
      name: hotel.name,
      rating: hotel.rating,
      address: hotel.address,
      city: cityShow,
      province: provinceShow,
      image: imageShow,
      facility: facilities,
      information: hotel.information,
      longitude: hotel.longitude,
      latitude: hotel.latitude,
      price: hotel.price
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

  removeHotelData(id: number) {
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

    this.dataHotelArr = this.dataHotelArr.filter((value, key) => {
      // @ts-ignore
      return value.id !== currID;
    });
    this.setDataSource(this.dataHotelArr);

    this.dialogError.open(DialogErrorComponent, {
      data: 'Success Delete Data !'
    });
    return;
  }

  deleteAction(hotel) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.removeHotelData(hotel.id);
      } else if (temp === true) {
        return;
      }
    });

  }

  updateAction(hotel) {
    this.dialogUpdateRef = this.dialogUpdate.open(UpdateHotelAdminComponent, {
      data: hotel
    });

    this.dialogUpdateRef.afterClosed().subscribe(async data => {
      await this.afterUpdateHotelData(data);
    });
  }

  afterUpdateHotelData(data) {

    if (data === undefined) {
      return;
    }

    const tempData = this.dataHotelArr.filter((value, key) => {
      return value.id === data.dataHotel.id;
    });

    tempData[0].name = data.dataHotel.name;
    tempData[0].information = data.dataHotel.information;
    tempData[0].price = data.dataHotel.price;
    tempData[0].rating = data.dataHotel.rating;

    this.dataHotelArr = this.dataHotelArr.filter((value, key) => {
      return value.id !== data.dataHotel.id;
    });
    this.dataHotelArr.push(this.createNewHotel(tempData[0]));
    this.setDataSource(this.dataHotelArr);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
