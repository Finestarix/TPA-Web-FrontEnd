import {AfterViewInit, Component, OnInit} from '@angular/core';
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
    ])
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {

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
  quickCard: HTMLElement;

  constructor() {
  }

  ngOnInit() {
    this.currentState = 'imageSliderStart';
    this.currIndex = 0;
    this.imageSlider();
  }

  ngAfterViewInit(): void {
    this.quickCard = document.getElementById('overlay-screen');
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

  something() {
    this.quickCard.classList.remove('overlay-screen');
  }

  setLayout() {
    // @ts-ignore
    scrollTo(document.documentElement, 347);
    this.quickCard.classList.add('overlay-screen');
  }

  // tslint:disable-next-line:no-shadowed-variable
  scrollTo(element: HTMLElement, to: number) {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, 1000000);
      element.scrollTop = val;
      if (currentTime < 1000000) {
        setTimeout(animateScroll, 10);
      }
    };
    animateScroll();
  }

  easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

}
