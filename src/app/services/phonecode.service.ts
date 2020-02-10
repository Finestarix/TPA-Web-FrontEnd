import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {insertNewUser} from './queries/userQuery';
import {getPhoneCode} from './queries/phonecodeQuery';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PhonecodeService {

  constructor(private apollo: Apollo) {
  }

  public getPhoneCode(): Observable<any> {

    return this.apollo.query<any>({
      query: getPhoneCode,
    });

  }


}
