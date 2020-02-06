import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Moment} from 'moment';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  destination: string;
  startDate: Moment;
  endDate: Moment;
  room: number;
  guess: number;

  ngOnInit() {
  }

  getAllParameterData(params) {

    if (params['destination'] === undefined) {
      this.router.navigateByUrl('/Hotel');
      return;
    }

    this.destination = params['destination'];
    this.startDate = params['startDate'];
    this.endDate = params['endDate'];
    this.room = params['room'];
    this.guess = params['guess'];
  }

}
