import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecHotelService} from '../../../../services/rec-hotel.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rec-hotel',
  templateUrl: './rec-hotel.component.html',
  styleUrls: ['./rec-hotel.component.scss']
})
export class RecHotelComponent implements OnInit {

  recHotel$: Subscription;
  recHotel: any;
  ratingWidth: number;

  constructor(private http: HttpClient,
              private recHotelService: RecHotelService) {

    navigator.geolocation.getCurrentPosition((succ) => {

      this.recHotel$ = this.recHotelService.getRecHotel(succ.coords.latitude, succ.coords.longitude).subscribe(async query => {
        // tslint:disable-next-line:no-unused-expression
        await this.afterGetRecHotel(query);
      });

    }, () => {
    });

  }

  ngOnInit () {

  }

  afterGetRecHotel(query) {
    this.recHotel = query.data.NearestHotel;
  }

}
