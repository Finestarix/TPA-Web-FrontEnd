import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {linkPlane, linkHotel, linkTrain, linkCar, linkEntertainment} from './cardboxData';

@Component({
  selector: 'app-cardbox',
  templateUrl: './cardbox.component.html',
  styleUrls: ['./cardbox.component.scss']
})
export class CardboxComponent implements OnInit, AfterViewInit {

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
    this.currentState = 0;
    this.setState(2);
  }

  ngAfterViewInit() {
    document.getElementById('linkEntertainment').classList.add('passive-content');
    document.getElementById('linkTrain').classList.add('passive-content');
  }

  stateCondition(stateNumber: number) {
    return this.currentState === stateNumber && this.currentState !== 0;
  }

  setState(nextState: number) {

    document.getElementById('linkPlane').classList.add('passive-content');
    document.getElementById('linkHotel').classList.add('passive-content');
    document.getElementById('linkCar').classList.add('passive-content');

    if (this.stateCondition(1)) {
      document.getElementById('linkPlane').classList.remove('active-content');
    } else if (this.stateCondition(2)) {
      document.getElementById('linkHotel').classList.remove('active-content');
    } else if(this.stateCondition(3)) {
      document.getElementById('linkCar').classList.remove('active-content');
    }

    this.currentState = nextState;

    if (this.stateCondition(1)) {
      document.getElementById('linkPlane').classList.add('active-content');
      document.getElementById('linkPlane').classList.remove('passive-content');
    } else if (this.stateCondition(2)) {
      document.getElementById('linkHotel').classList.add('active-content');
      document.getElementById('linkHotel').classList.remove('passive-content');
    } else if (this.stateCondition(3)) {
      document.getElementById('linkCar').classList.add('active-content');
      document.getElementById('linkCar').classList.remove('passive-content');
    }
  }


}
