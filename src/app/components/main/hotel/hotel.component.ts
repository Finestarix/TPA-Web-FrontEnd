import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit, AfterViewInit {

  constructor(private chatService: ChatService) {

  }

  quickCard: HTMLElement;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.quickCard = document.getElementById('overlay-screen');
  }

  something() {
    this.quickCard.classList.remove('overlay-screen');
  }

  setLayout() {
    // @ts-ignore
    scrollTo(document.documentElement, 130);
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
  };

}
