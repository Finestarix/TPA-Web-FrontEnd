import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {HotelData} from '../../../models/hotel-interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import {InsertHotelAdminComponent} from '../hotel-admin/insert-hotel-admin/insert-hotel-admin.component';
import {UpdateHotelAdminComponent} from '../hotel-admin/update-hotel-admin/update-hotel-admin.component';
import {InsertFlightAdminComponent} from './insert-flight-admin/insert-flight-admin.component';
import {UpdateFlightAdminComponent} from './update-flight-admin/update-flight-admin.component';
import {HotelService} from '../../../services/hotel.service';
import {FlightService} from '../../../services/flight.service';
import {FlightData} from '../../../models/flight-interface';
import * as moment from 'moment';

@Component({
  selector: 'app-flight-admin',
  templateUrl: './flight-admin.component.html',
  styleUrls: ['./flight-admin.component.scss']
})
export class FlightAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataFlight$: Subscription;
  dataFlight: any;
  dataFlightArr: FlightData[] = [];

  dataFlightDelete$: Subscription;

  allColumns = ['companyIcon', 'companyName', 'departureDate', 'arriveDate', 'duration', 'price', 'timeline', 'transit', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;
  private dialogInsertRef: MatDialogRef<InsertFlightAdminComponent>;
  private dialogUpdateRef: MatDialogRef<UpdateFlightAdminComponent>;

  constructor(private flightService: FlightService,
              private dialogInsert: MatDialog,
              private dialogUpdate: MatDialog,
              private dialogConfirm: MatDialog,
              private dialogError: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getFlightData();
  }

  setDataSource(flight: object[]) {
    this.dataSource = new MatTableDataSource(flight);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFlightData() {
    this.dataFlightArr = [];
    this.dataFlight$ = this.flightService.getAllFlight().subscribe(async query => {
      await this.fetchHotelData(query);
    });
  }

  fetchHotelData(query) {
    this.dataFlight = query.data.AllFlight;

    for (const hotel of this.dataFlight) {
      this.dataFlightArr.push(this.createNewFlight(hotel));
    }

    this.setDataSource(this.dataFlightArr);
    this.dataFlight$.unsubscribe();
  }


  createNewFlight(flight: any): FlightData {
    const arriveDateFormat = moment(new Date(flight.arrivalTime));
    const departDateFormat = moment(new Date(flight.departureTime));
    const duration = moment.duration(departDateFormat.diff(arriveDateFormat));

    const fromAirport = flight.fromAirport.name + ' (' + flight.fromAirport.code + ')';
    const toAirport = flight.toAirport.name + ' (' + flight.toAirport.code + ')';
    let transitAirport = flight.transit.name + ' (' + flight.transit.code + ')';

    let timelineStr = fromAirport + ' -> ';
    if (flight.transit.code !== 'NULL') {
      timelineStr += transitAirport + ' -> ';
    } else {
      transitAirport = 'No Transit';
    }
    timelineStr += toAirport;

    return {
      companyName: flight.company.name,
      companyIcon: flight.company.image,
      transitDuration: flight.transitDuration,
      arriveDate: flight.arrivalTime,
      departDate: flight.departureTime.toString(),
      duration: duration.hours() + ' Hour ' + duration.minutes() + ' Minutes',
      price: flight.price,
      timeline: timelineStr,
      transit: transitAirport,
      id: flight.id,
      model: flight.model,
      to: toAirport,
      from: fromAirport,
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  insertAction() {
    this.dialogInsertRef = this.dialogInsert.open(InsertFlightAdminComponent);

    this.dialogInsertRef.afterClosed().subscribe(data => {
      this.getFlightData();
    });
  }

  updateAction(flight: any) {
    this.dialogUpdateRef = this.dialogUpdate.open(UpdateFlightAdminComponent, {data: flight});

    this.dialogUpdateRef.afterClosed().subscribe(data => {
      this.getFlightData();
    });
  }

  deleteAction(flight: any) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.dataFlightDelete$ = this.flightService.deleteFlight(flight.id).subscribe(async query => {
          await this.getFlightData();
        });
      } else {
        return;
      }
    });
  }
}
