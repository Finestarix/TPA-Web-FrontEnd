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
    if (this.dataImageText.title === 'Whatsapp' ||
      this.dataImageText.title === 'Email' ||
      this.dataImageText.title === 'Call Center') {

      const coloring = document.getElementsByClassName('feature-other');
      // @ts-ignore
      for(const color of coloring) {
        color.classList.add('coloring');
      }

    }
  }

}
