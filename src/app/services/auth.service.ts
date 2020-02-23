import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = '';

  constructor() {
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('id-admin');

    if (token === '' || token === null) {
      return false;
    }

    const tokenData = jwt_decode(token);

    if (tokenData.id !== 0) {
      return true;
    }

    return false;
  }

}
