import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {Subscription} from 'rxjs';
import {EventService} from '../../../services/event.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from "@angular/router";

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss'],
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
export class EntertainmentComponent implements OnInit {

  constructor(private chatService: ChatService,
              private router: Router,
              private eventService: EventService) {
  }

  currIndex: number;
  currentState: string;
  imageList: string[] = [
    'assets/home-imageslider/1.jpg',
    'assets/home-imageslider/2.jpg',
    'assets/home-imageslider/3.jpg',
    'assets/home-imageslider/4.jpg',
    'assets/home-imageslider/5.jpg',
    'assets/home-imageslider/6.jpg',
  ];

  private eventDataActivity$: Subscription;
  private eventDataActivity: any;
  private eventDataEvent$: Subscription;
  private eventDataEvent: any;
  private eventDataAttraction$: Subscription;
  private eventDataAttraction: any;
  private eventDataConcat: any = [];

  private searchEvent$: Subscription;
  private searchEvent: any;

  private selectedLocation: string;
  private eventLocation: object[] = [
    {
      name: 'Indonesia',
      data: ['Bali', 'Jakarta', 'Yogyakarta']
    },
    {
      name: 'Singapore',
      data: ['Singapore', 'Central Business']
    },
    {
      name: 'Malaysia',
      data: ['Johor', 'Penang', 'Perak']
    },
    {
      name: 'Japan',
      data: ['Kyoto', 'Osaka', 'Tokyo']
    },
  ];
  selectedCategory: string;

  ngOnInit() {
    this.currentState = 'imageSliderStart';
    this.currIndex = 0;
    this.imageSlider();

    this.selectedCategory = 'All';
    this.selectedLocation = '';

    this.chatService.listen('event').subscribe(m => {
      alert(m);
    });

    this.eventDataActivity$ = this.eventService.getEventCategory('Activity').subscribe(async value => {
      await this.getActivity(value);
    });

    this.eventDataAttraction$ = this.eventService.getEventCategory('Attraction').subscribe(async value => {
      await this.getAttraction(value);
    });

    this.eventDataEvent$ = this.eventService.getEventCategory('Event').subscribe(async value => {
      await this.getEvent(value);
    });
  }

  getActivity(value) {
    this.eventDataActivity = value.data.GetEntertainmentCategory;
    console.log(this.eventDataActivity);
    this.eventDataConcat = [...this.eventDataConcat, this.eventDataActivity[0]];
  }

  getAttraction(value) {
    this.eventDataAttraction = value.data.GetEntertainmentCategory;
    console.log(this.eventDataAttraction);
    this.eventDataConcat = [...this.eventDataConcat, this.eventDataAttraction[0]];
  }

  getEvent(value) {
    this.eventDataEvent = value.data.GetEntertainmentCategory;
    console.log(this.eventDataEvent);
    this.eventDataConcat = [...this.eventDataConcat, this.eventDataEvent[0]];
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

  goToDetail() {

    if (this.selectedLocation === '' || this.selectedCategory === '') {
      alert('Fill all Field !');
      return;
    }

    this.router.navigate(['/Entertainment/Search'], {
      queryParams: {
        location: this.selectedLocation,
        category: this.selectedCategory
      }
    });
  }

}
