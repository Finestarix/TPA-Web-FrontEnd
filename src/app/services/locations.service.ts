import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {getLocation, getLocationProvince} from './queries/locationQuery';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private apollo: Apollo) {
  }

  getLocation(): Observable<any> {
    return this.apollo.query<any>({
      query: getLocation,
    });
  }

  getLocationWithProvince(province: string): Observable<any> {

    const convertedProvince = String(province);

    return this.apollo.query<any>({
      query: getLocationProvince,
      variables: {
        provinceData: convertedProvince,
      }
    });

  }
}
