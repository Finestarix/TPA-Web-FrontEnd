import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss']
})
export class ImageTextComponent implements OnInit {

  @Input('dataImageText') dataImageText: any;

  textColor: string;

  constructor() {
  }

  ngOnInit() {
    document.getElementById('feature-other').classList.add('coloring');
    this.textColor = (this.dataImageText.title === 'Whatsapp' ||
      this.dataImageText.title === 'Email' ||
      this.dataImageText.title === 'Call Center') ? 'white' : 'black';
  }

}
