import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

import {getEmailAndPhone, getValidUser} from './queries/loginService';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) {
  }

  getUser(emailphoneParam: string): Observable<any> {

    const convertedData = String(emailphoneParam);

    return this.apollo.query<any>({
      query: getEmailAndPhone,
      variables: {
        param: convertedData,
      }
    });
  }

  getValidUser(emailphoneParam: string, passwordParam: string): Observable<any> {

    const emailphone = String(emailphoneParam);
    const password = String(passwordParam);

    return this.apollo.query<any>({
      query: getValidUser,
      variables: {
        searchEmailPhone: emailphone,
        searchPassword: password
      }
    });
  }

}
