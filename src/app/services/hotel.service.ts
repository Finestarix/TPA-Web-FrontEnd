import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  getHotelByProvince,
  getRecommendedHotel,
  getHotelByLatLong,
  getHotelByID,
  getAllHotel,
  deleteHotelByID
} from './queries/hotelQuery';
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

  getHotelByLatLong(latitude: any, longitude: any) {
    const convertedLatitude = parseFloat(latitude);
    const convertedLongitude = parseFloat(longitude);

    return this.apollo.query<any>({
      query: getHotelByLatLong,
      variables: {
        latitude: convertedLatitude,
        longitude: convertedLongitude,
      }
    });
  }

  getHotelByID(id: any) {
    const convertedID = parseInt(id, 3);

    return this.apollo.query<any>({
      query: getHotelByID,
      variables: {
        idData: convertedID,
      }
    });
  }

  getAllHotel() {
    return this.apollo.query<any>({
      query: getAllHotel,
    });
  }

  deleteHotelByID(id: any) {
    const convertedID = String(id);
    console.log(typeof convertedID);

    return this.apollo.mutate<any>({
      mutation: deleteHotelByID,
      variables: {
        idData: convertedID,
      }
    });
  }
}
