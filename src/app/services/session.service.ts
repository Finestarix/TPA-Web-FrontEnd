import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
  }

  setSession(value: string) {
    sessionStorage.setItem('id',  value);
  }

  getSession() {
    return sessionStorage.getItem('id');
  }

  removeSession() {
    sessionStorage.removeItem('id');
  }

}
