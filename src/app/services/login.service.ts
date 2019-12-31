import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

import {getEmailAndPhone} from './query/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) {
  }


  getUser(emailphoneParam: string): Observable<any> {

    const convertedData = String(emailphoneParam)

    return this.apollo.query<any>({
      query: gql`
        query getCurrentUser($param: String!) {
          UserByEmailAndPhone(emailphone: $param) {
            id
            firstname
            lastname
            email
            phone
          }
        }
      `,
      variables: {
        param: convertedData
      }
    })
      ;
  }


}
