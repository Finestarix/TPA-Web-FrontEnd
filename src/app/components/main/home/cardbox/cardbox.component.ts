import {Component, Input, OnInit} from '@angular/core';
import {linkPlane, linkHotel, linkTrain, linkCar, linkEntertainment} from './cardboxData';

@Component({
  selector: 'app-cardbox',
  templateUrl: './cardbox.component.html',
  styleUrls: ['./cardbox.component.scss']
})
export class CardboxComponent implements OnInit {

  linkPlane: object;
  linkHotel: object;
  linkTrain: object;
  linkCar: object;
  linkEntertainment: object;

  constructor() {
    this.linkPlane = linkPlane;
    this.linkHotel = linkHotel;
    this.linkTrain = linkTrain;
    this.linkCar = linkCar;
    this.linkEntertainment = linkEntertainment;
  }

  currentState: number;

  ngOnInit() {
    this.currentState = 1;
  }

  setState(nextState: number) {
    this.currentState = nextState;
  }


}
