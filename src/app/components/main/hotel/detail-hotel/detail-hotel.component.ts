import { Component, OnInit } from '@angular/core';
import {HotelService} from '../../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss']
})
export class DetailHotelComponent implements OnInit {

  constructor(private hotelService: HotelService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {

    this.activatedRouter.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  hotelData$: Subscription;
  hotelData: any;

  id: number;
  startDate: Date;
  endDate: Date;
  room: number;
  guest: number;

  ngOnInit() {
  }

  getAllParameterData(params) {

    if (params.id === undefined) {
      this.router.navigateByUrl('/Hotel');
      return;
    }

    this.id = params.id;
    this.startDate = new Date(params.startDate);
    this.endDate = new Date(params.endDate);
    this.room = params.room;
    this.guest = params.guest;

    this.hotelData$ = this.hotelService.getHotelByID(this.id).subscribe(async query => {
      await this.getHotelData(query);
    });
  }

  getHotelData(query) {
    this.hotelData = query.data.GetHotelByID;
    console.log(this.hotelData);
  }
}


