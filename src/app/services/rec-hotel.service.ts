import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {getRecommendedHotel} from './queries/recHotelService';
import {getPhoneCode} from './queries/registerService';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RecHotelService {

  constructor(private apollo: Apollo) { }

  getRecHotel(latitude: any, longitude: any): Observable<any> {

    const convertedLatitude = parseFloat(latitude);
    const convertedLongitude = parseFloat(longitude);

    return this.apollo.query<any>({
      query: getRecommendedHotel,
      variables: {
        latitude: convertedLatitude,
        longitude: convertedLongitude,
      }
    });
  }
}
