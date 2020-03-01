import {Component, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from '../../../core/text-editor/text-editor.component';
import {BlogService} from '../../../../services/blog.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {EventData} from '../../../../models/event-interface';

@Component({
  selector: 'app-insert-event-admin',
  templateUrl: './insert-event-admin.component.html',
  styleUrls: ['./insert-event-admin.component.scss']
})
export class InsertEventAdminComponent implements OnInit {

  @ViewChild(TextEditorComponent, {static: true})
  private textEditor: TextEditorComponent;

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
              private router: Router) {
    this.selectedArg = 'Insert';
  }

  ngOnInit() {
  }

  insertEvent() {

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
      id: 0
    };

    this.eventService.insertEvent(event).subscribe(async query => {
      await this.router.navigateByUrl('Admin/Home');
    });

  }

}
