import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {getHotelByCity, getRecommendedHotel} from './queries/hotelQuery';
import {getPhoneCode} from './queries/phonecodeQuery';
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

  getHotelByCity(city: string): Observable<any> {

    const convertedCity = String(city);

    return this.apollo.query<any>({
      query: getHotelByCity,
      variables: {
        cityData: convertedCity,
      }
    });
  }
}
