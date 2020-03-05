import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {Options} from 'ng5-slider';

@Component({
  selector: 'app-search-entertainment',
  templateUrl: './search-entertainment.component.html',
  styleUrls: ['./search-entertainment.component.scss']
})
export class SearchEntertainmentComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,
              private eventService: EventService,
              private router: Router) {
    this.activateRoute.queryParams.subscribe(async value => {
      await this.getParams(value);
    });

    this.selectedEndDate = '2020-03-04T00:00:00Z';
    this.selectedStartDate = '2020-03-01T00:00:00Z';
    this.selectedLowPrice = 0;
    this.selectedHighPrice = 1000000;
    this.selectedCheckBoxEvent = true;
    this.selectedCheckBoxActivity = true;
    this.selectedCheckBoxAttraction = true;

  }

  eventData: any = [];
  selectedLocation: string;
  selectedCategory: string;
  selectedStartDate: string;
  selectedEndDate: string;
  selectedLowPrice: number;
  selectedHighPrice: number;
  options: Options = {
    floor: 0,
    ceil: 1000000,
  };
  selectedCheckBoxEvent: boolean;
  selectedCheckBoxActivity: boolean;
  selectedCheckBoxAttraction: boolean;
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

  totalShow = 1;
  dataShow: any[] = [];

  ngOnInit() {
    this.getEventData();
  }

  getEventData() {
    this.eventService.getFilterEntertainment(this.selectedLowPrice, this.selectedHighPrice,
      this.selectedStartDate, this.selectedEndDate, this.selectedLocation, String(this.selectedCheckBoxActivity),
      String(this.selectedCheckBoxAttraction), String(this.selectedCheckBoxEvent)).subscribe(async value => {
      await this.getEvent(value);
    });
  }

  getEvent(value) {
    this.eventData = value.data.GetFilterEntertainment;
    this.dataShow = this.eventData.slice(0, this.totalShow);
  }

  getParams(value) {
    this.selectedCategory = value.category;
    this.selectedLocation = value.location;
  }

  detectChange() {
    this.getEventData();
  }

  goToDetail(data) {
    this.router.navigate(['/Entertainment/Detail'], {
      queryParams: {
        id: data.id
      }
    });
  }

  onScroll() {
    if (this.totalShow <= this.eventData.length) {
      this.totalShow += 2;
      this.dataShow = this.eventData.slice(0, this.totalShow);
    }
  }
}
