import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {HotelService} from '../../../../services/hotel.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss']
})
export class DetailHotelComponent implements OnInit, AfterViewInit {

  constructor(private hotelService: HotelService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  hotelData$: Subscription;
  hotelData: any;

  map: L.map;
  id: number;
  startDate: Date;
  endDate: Date;
  room: number;
  guest: number;

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
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

    setTimeout(() => {
      this.map = L.map('map', {zoomControl: false}).setView([this.hotelData.latitude, this.hotelData.longitude], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      const temp = L.marker([this.hotelData.latitude, this.hotelData.longitude]);
      temp.addTo(this.map);
    }, 100);
  }

  ngAfterViewInit(): void {

  }

  facebook() {
    window.open('http://www.facebook.com/sharer.php?u=http://127.0.0.1:4200/Detail?id=' + this.id + '&startDate=' + this.startDate + '&endDate=' + this.endDate +
      '&room=' + this.room + '&guest=' + this.guest, 'facebookShare', 'width=626,height=436');
  }

  whatsapp() {
    window.open('https://api.whatsapp.com/send?text=localhost:4200/Detail?id=' + this.id + '&startDate=' + this.startDate + '&endDate=' + this.endDate +
      '&room=' + this.room + '&guest=' + this.guest)
  }

  copy() {
    navigator.clipboard.writeText('localhost:4200/Detail?id=' + this.id + '&startDate=' + this.startDate + '&endDate=' + this.endDate +
      '&room=' + this.room + '&guest=' + this.guest);
  }

  
}


