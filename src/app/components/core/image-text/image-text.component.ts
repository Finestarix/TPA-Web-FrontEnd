import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss']
})
export class ImageTextComponent implements OnInit {

  @Input('dataPass') dataPass: any;

  constructor() {
  }

  ngOnInit() {
  }

}
