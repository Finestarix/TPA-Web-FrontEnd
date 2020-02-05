import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {getLocation} from './queries/locationService';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private apollo: Apollo) {
  }

  getLocation(): Observable<any> {
    return this.apollo.query<any>({
      query: getLocation,
    });
  }
}
