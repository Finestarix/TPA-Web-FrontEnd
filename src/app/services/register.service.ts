import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {getPhoneCode} from './query/registerService';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  public getPhoneCode(): Observable<any> {

    return this.apollo.query<any>({
      query: getPhoneCode,
    });
  }
}
