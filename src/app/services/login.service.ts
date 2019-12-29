import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) {
  }

  getUser(searchData: string): Observable<any> {
    console.log(searchData);
    return this.apollo.query<any>({
      query: gql`{
          UserByEmailAndPhone(emailphone: "8998278243") {
            id
            firstname
            lastname
          }
        }
        `,
      variables:{
        paramData: searchData
      }
    });
  }


}
