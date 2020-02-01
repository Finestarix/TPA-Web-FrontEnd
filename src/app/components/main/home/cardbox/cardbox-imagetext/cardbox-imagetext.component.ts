import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cardbox-imagetext',
  templateUrl: './cardbox-imagetext.component.html',
  styleUrls: ['./cardbox-imagetext.component.scss']
})
export class CardboxImagetextComponent implements OnInit {

  @Input('linkImageText') imageText: object;

  constructor() {
  }

  ngOnInit() {
  }

}
