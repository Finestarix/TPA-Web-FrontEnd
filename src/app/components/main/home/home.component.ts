import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('imageSliderAnimation', [
      state('imageSliderStart', style({
        left: 0,
      })),
      state('imageSliderMiddle', style({
        left: '-150%',
      })),
      state('imageSliderEnd', style({
        left: '150%',
      })),
      transition('imageSliderStart <=> imageSliderMiddle', animate('200ms')),
      transition('imageSliderStart <=> imageSliderEnd', animate('200ms'))
    ]),
  ],
})
export class HomeComponent implements OnInit {

  currIndex: number;
  imageList: string[] = [
    'assets/home-imageslider/1.jpg',
    'assets/home-imageslider/2.jpg',
    'assets/home-imageslider/3.jpg',
    'assets/home-imageslider/4.jpg',
    'assets/home-imageslider/5.jpg',
    'assets/home-imageslider/6.jpg',
  ];

  currentState: string;

  constructor() {
  }

  ngOnInit() {
    this.currentState = 'imageSliderStart';
    this.currIndex = 0;
    this.imageSlider();
  }

  validateIndex(): void {
    if (this.currIndex >= 5) {
      this.currIndex = 0;
    } else if (this.currIndex <= 0) {
      this.currIndex = 5;
    }

  }

  nextImageSlider(): void {
    this.currentState = 'imageSliderMiddle';

    setTimeout(() => {
      this.currentState = 'imageSliderEnd';
      this.currIndex++;
      this.validateIndex();
    }, 800);

    setTimeout(() => {
      this.currentState = 'imageSliderStart';
    }, 800);
  }

  prevImageSlider(): void {
    this.currentState = 'imageSliderEnd';

    setTimeout(() => {
      this.currentState = 'imageSliderMiddle';
      this.currIndex--;
      this.validateIndex();
    }, 800);

    setTimeout(() => {
      this.currentState = 'imageSliderStart';
    }, 800);
  }

  imageSlider(): void {
    setInterval(() => {

      this.currentState = 'imageSliderMiddle';

      setTimeout(() => {
        this.currentState = 'imageSliderEnd';
        this.currIndex++;
        this.validateIndex();
      }, 300);

      setTimeout(() => {
        this.currentState = 'imageSliderStart';
      }, 300);

    }, 9000);
  }


}
