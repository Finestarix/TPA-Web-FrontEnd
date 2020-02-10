import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

import {getEmailAndPhone, getUserByID, getValidUser, insertNewUser} from './queries/userQuery';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  insertUser(email: string, firstName: string, lastName: string,
             phoneCode: string, phone: string, password: string,
             image: string): Observable<any> {

    const emailConvert = String(email);
    const firstNameConvert = String(firstName);
    const lastNameConvert = String(lastName);
    const phoneCodeConvert = String(phoneCode);
    const phoneConvert = String(phone);
    const passwordConvert = String(password);
    const imageConvert = String(image);

    return this.apollo.mutate<any>({
      mutation: insertNewUser,
      variables: {
        emailData: emailConvert,
        firstNameData: firstNameConvert,
        lastNameData: lastNameConvert,
        phoneCodeData: phoneCodeConvert,
        phoneData: phoneConvert,
        passwordData: passwordConvert,
        imageData: imageConvert
      }
    });

  }

  getUserByID(id: number): Observable<any> {

    return this.apollo.query<any>({
      query: getUserByID,
      variables: {
        searchID: id,
      }
    })

  }

}
