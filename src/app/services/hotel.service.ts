import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getHotelByProvince, getRecommendedHotel} from './queries/hotelQuery';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private apollo: Apollo) {
  }

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

  getHotelByCity(province: string): Observable<any> {

    const convertedProvince = String(province);

    return this.apollo.query<any>({
      query: getHotelByProvince,
      variables: {
        provinceData: convertedProvince,
      }
    });
  }
}