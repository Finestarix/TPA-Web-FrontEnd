import {Component, OnInit} from '@angular/core';
import {footerData, images, services} from './footer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  services: object[];
  footerData: object[];
  images: object[];

  constructor() {
    this.services = services;
    this.footerData = footerData;
    this.images = images;
  }

  ngOnInit() {
  }

}
