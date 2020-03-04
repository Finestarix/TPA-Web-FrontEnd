import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import {EventData} from '../../../models/event-interface';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {TextEditorComponent} from '../../core/text-editor/text-editor.component';
import {DialogErrorComponent} from "../core/dialog-error/dialog-error.component";
import {ChatService} from "../../../services/chat.service";
import {log} from "util";

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChildren(TextEditorComponent)
  private textEditor: QueryList<TextEditorComponent>;

  dataEvent$: Subscription;
  dataEvent: any;
  dataEventArr: EventData[] = [];

  allColumns = ['title', 'image', 'location', 'date', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;
  selectedID: number;
  selectedImage: string;
  selectedLatitude: number;
  selectedLongitude: number;
  selectedPrice: number;
  selectedLocation: string;
  selectedDate: string;
  selectedCategory: string;
  selectedDescription: string;
  selectedTermCondition: string;
  selectedTitle: string;

  constructor(private eventService: EventService,
              private chatService: ChatService,
              private dialogConfirm: MatDialog,
              private router: Router,
              private dialogError: MatDialog) {
    this.selectedID = 0;
    this.selectedImage = '';
    this.selectedLatitude = 0;
    this.selectedLongitude = 0;
    this.selectedPrice = 0;
    this.selectedLocation = '';
    this.selectedDate = '';
    this.selectedCategory = '';
    this.selectedDescription = '';
    this.selectedTermCondition = '';
    this.selectedTitle = '';
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getEventData();
  }

  applyFilter(filterEvent: any) {
    let filterValue: string = filterEvent.target.value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
      description: event.description,
      termCondition: event.termCondition
    };
  }

  isAllEmpty(): boolean {
    return (this.selectedDate === '' || this.selectedImage === '' || this.selectedCategory === '' ||
      this.selectedLongitude === 0 || this.selectedLatitude === 0 ||  this.selectedLocation === '');
  }

  createNewEventInput(): EventData {
    return {
      date: this.selectedDate,
      id: this.selectedID,
      // @ts-ignore
      image: this.selectedImage.files[0].name,
      location: this.selectedLocation,
      latitude: this.selectedLatitude,
      longitude: this.selectedLongitude,
      price: this.selectedPrice,
      title: this.selectedTitle,
      type: this.selectedCategory,
      // @ts-ignore
      description: this.textEditor.toArray()[0].content.nativeElement.innerHTML,
      // @ts-ignore
      termCondition: this.textEditor.toArray()[1].content.nativeElement.innerHTML
    };
  }

  insertAction() {

    if (this.isAllEmpty()) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill all Field !'
      });
      return;
    }

    let newEvent: EventData;
    newEvent = this.createNewEventInput();

    this.eventService.insertEvent(newEvent).subscribe(async query => {
      await this.getEventData();
    });

    this.chatService.emit('event', 'New Event Inserted !');
  }

  setData(row: any) {
    this.selectedPrice = row.price;
    this.selectedID = row.id;
    this.selectedImage = row.image;
    this.selectedLocation = row.location;
    this.selectedLatitude = row.latitude;
    this.selectedLongitude = row.longitude;
    this.selectedTitle = row.title;
    this.selectedCategory = row.type;
    this.textEditor.toArray()[0].content.nativeElement.innerHTML = row.description;
    this.textEditor.toArray()[1].content.nativeElement.innerHTML = row.termCondition;
  }

  updateAction() {

    let newEvent: EventData;
    newEvent = this.createNewEventInput();
    console.log(newEvent);

    this.eventService.updateEvent(newEvent).subscribe(async query => {
      await this.getEventData();
    });

    this.chatService.emit('event', 'Event Updated!');
  }

  deleteAction(event: any) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.eventService.deleteEvent(event.id).subscribe(async query => {
          await this.getEventData();
        });
      } else {
        return;
      }
    });
  }

}
