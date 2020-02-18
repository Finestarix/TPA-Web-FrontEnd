import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HotelService} from '../../../../services/hotel.service';
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

  loadingPlaceholder: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private http: HttpClient,
              private recHotelService: HotelService) {

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
