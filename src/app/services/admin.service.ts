import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from "rxjs";
import {getAdminLogin} from "./queries/adminQuery";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apollo: Apollo) { }

  getAdminLogin(email: any, password: any): Observable<any> {

    const convertedEmail = String(email);
    const convertedPassword = String(password);

    return this.apollo.query<any>({
      query: getAdminLogin,
      variables: {
        emailData: convertedEmail,
        passwordData: convertedPassword,
      }
    });

  }
}
