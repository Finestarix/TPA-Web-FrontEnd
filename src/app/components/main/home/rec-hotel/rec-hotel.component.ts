import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HotelService} from '../../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {log} from "util";

@Component({
  selector: 'app-rec-hotel',
  templateUrl: './rec-hotel.component.html',
  styleUrls: ['./rec-hotel.component.scss']
})
export class RecHotelComponent implements OnInit {

  recHotel$: Subscription;
  recHotel: any;

  constructor(private http: HttpClient,
              private recHotelService: HotelService) {

    navigator.geolocation.getCurrentPosition((succ) => {

      this.recHotel$ = this.recHotelService.getRecHotel(succ.coords.latitude, succ.coords.longitude).subscribe(async query => {
        // tslint:disable-next-line:no-unused-expression
        await this.afterGetRecHotel(query);
      });

    }, () => {
      console.log('Location Turn Off');
    });

  }

  ngOnInit () {

  }

  afterGetRecHotel(query) {
    this.recHotel = query.data.NearestHotel;
    console.log(this.recHotel);
  }

}
