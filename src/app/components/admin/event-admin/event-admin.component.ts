import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import * as moment from 'moment';
import {EventData} from '../../../models/event-interface';
import {EventService} from '../../../services/event.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataEvent$: Subscription;
  dataEvent: any;
  dataEventArr: EventData[] = [];

  allColumns = ['title', 'image', 'location', 'date', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;

  constructor(private eventService: EventService,
              private dialogConfirm: MatDialog,
              private router: Router,
              private dialogError: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getEventData();
  }

  setDataSource(flight: object[]) {
    this.dataSource = new MatTableDataSource(flight);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEventData() {
    this.dataEventArr = [];
    this.dataEvent$ = this.eventService.getAllEvent().subscribe(async query => {
      await this.fetchEventData(query);
    });
  }

  fetchEventData(query) {
    this.dataEvent = query.data.AllEntertainment;

    for (const event of this.dataEvent) {
      this.dataEventArr.push(this.createNewEvent(event));
    }

    this.setDataSource(this.dataEventArr);
    this.dataEvent$.unsubscribe();
  }

  createNewEvent(event: any): EventData {
    return {
      date: event.date,
      id: event.id,
      image: event.image,
      location: event.location,
      latitude: event.latitude,
      longitude: event.longitude,
      price: event.price,
      title: event.title,
      type: event.type,
      description: ''
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  updateAction(row: any) {
    console.log(row.id);
    this.router.navigate(['/Admin/UpdateEvent'], {
      queryParams: {
        date: row.date,
        id: row.id,
        image: row.image,
        location: row.location,
        latitude: row.latitude,
        longitude: row.longitude,
        price: row.price,
        title: row.title,
        type: row.type,
        description: ''
      }
    });
  }

  deleteAction(row: any) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.eventService.deleteEvent(row.id).subscribe(async query => {
          await this.getEventData();
        });
      } else {
        return;
      }
    });
  }

  insertAction() {
    this.router.navigate(['/Admin/InsertEvent']);
  }

}
