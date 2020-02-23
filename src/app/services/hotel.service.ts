import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  getHotelByProvince,
  getRecommendedHotel,
  getHotelByLatLong,
  getHotelByID,
  getAllHotel,
  deleteHotelByID, insertHotel, insertHotelFacility, updateHotel
} from './queries/hotelQuery';
import {Apollo} from 'apollo-angular';
import {HotelData} from "../models/hotel-interface";

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
    const convertedID = String(id);

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

    return this.apollo.mutate<any>({
      mutation: deleteHotelByID,
      variables: {
        idData: convertedID,
      }
    });
  }

  insertHotel(hotelData: HotelData) {

    const nameConverted = String(hotelData.name);
    const ratingConverted = String(hotelData.rating);
    const addressConverted = String(hotelData.address);
    const locationConverted = String(hotelData.city);
    const priceConverted = String(hotelData.price);
    const latitudeConverted = String(hotelData.latitude);
    const longitudeConverted = String(hotelData.longitude);
    const informationConverted = String(hotelData.information);

    return this.apollo.mutate<any>({
      mutation: insertHotel,
      variables: {
        nameData: nameConverted,
        ratingData: ratingConverted,
        addressData: addressConverted,
        locationData: locationConverted,
        priceData: priceConverted,
        latitudeData: latitudeConverted,
        longitudeData: longitudeConverted,
        informationData: informationConverted
      }
    });
  }

  updateHotel(hotelData: HotelData) {

    const idConverted = String(hotelData.id);
    const nameConverted = String(hotelData.name);
    const ratingConverted = String(hotelData.rating);
    const priceConverted = String(hotelData.price);
    const informationConverted = String(hotelData.information);

    return this.apollo.mutate<any>({
      mutation: updateHotel,
      variables: {
        idData: idConverted,
        nameData: nameConverted,
        ratingData: ratingConverted,
        priceData: priceConverted,
        informationData: informationConverted
      }
    });
  }

  insertHotelFacility(id: number, name: string) {
    return this.apollo.mutate<any>({
      mutation: insertHotelFacility,
      variables: {
        idData: id,
        nameData: name
      }
    });
  }
}
