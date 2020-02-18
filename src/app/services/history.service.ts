import {Injectable} from '@angular/core';
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {
  }

  setSession(value: object) {

    let before: object[] = JSON.parse(this.getSession());

    if (before === null) {
      before = [value];
    } else {
      before.push(value);
    }

    sessionStorage.setItem('hotel-history',  JSON.stringify(before));
  }

  getSession() {
    return sessionStorage.getItem('hotel-history');
  }
}
