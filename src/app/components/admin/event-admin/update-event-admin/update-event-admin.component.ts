import {Component, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from "../../../core/text-editor/text-editor.component";
import {EventService} from "../../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogErrorComponent} from "../../core/dialog-error/dialog-error.component";
import {EventData} from "../../../../models/event-interface";

@Component({
  selector: 'app-update-event-admin',
  templateUrl: './update-event-admin.component.html',
  styleUrls: ['./update-event-admin.component.scss']
})
export class UpdateEventAdminComponent implements OnInit {


  @ViewChild(TextEditorComponent, {static: true})
  private textEditor: TextEditorComponent;

  id: number;
  selectedCategory: string;
  selectedImage: string;
  selectedLatitude: string;
  selectedLongitude: string;
  selectedPrice: string;
  selectedLocation: string;
  selectedDate: string;
  selectedArg: string;

  constructor(private eventService: EventService,
              private dialogError: MatDialog,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.activatedRouter.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  ngOnInit() {
  }

  getAllParameterData(params) {
    this.id = params.id;

    this.selectedArg = params.title;
    this.selectedCategory = params.category;
    this.selectedImage = params.image;
    this.selectedLongitude = params.longitude;
    this.selectedLocation = params.location;
    this.selectedLatitude = params.latitude;
    this.selectedPrice = params.price;
  }

  updateEvent() {

    if (this.textEditor.getTitle() === '' || this.textEditor.getContent() === ''
      || this.selectedCategory === '' || this.selectedImage === '' || this.selectedDate === '' ||
      this.selectedLatitude === '' || this.selectedLongitude === '' || this.selectedPrice === '' || this.selectedLocation === '') {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    if (this.textEditor.getTitle().length < 10) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Minimum Length Title is 10 Character!'
      });
      return;
    }

    const event: EventData = {
      type: this.selectedCategory,
      date: new Date(this.selectedDate).toISOString().substr(0, 11) + '00:00:00Z',
      image: this.selectedImage,
      latitude: this.selectedLatitude,
      location: this.selectedLocation,
      longitude: this.selectedLongitude,
      price: parseInt(this.selectedPrice, 32),
      title: this.textEditor.getTitle(),
      description: this.textEditor.getContent(),
      id: this.id
    };

    console.log(this.id);

    this.eventService.updateEvent(event).subscribe(async query => {
      await this.router.navigateByUrl('Admin/Home');
    });

  }



}
