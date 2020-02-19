import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {getAllCarModel, getCarByLocation} from "./queries/carQuery";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private apollo: Apollo) { }

  getCarByLocation(city: any) {

    const convertedCity = String(city);

    return this.apollo.query<any>({
      query: getCarByLocation,
      variables: {
        cityData: convertedCity,
      }
    });
  }

  getCarModel() {
    return this.apollo.query<any>({
      query: getAllCarModel,
    });
  }

}
