import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) {
  }

  setSession(value: string) {
    sessionStorage.setItem('id',  value);
    this.router.navigateByUrl('');
  }

  getSession() {
    return sessionStorage.getItem('id');
  }

  removeSession() {
    sessionStorage.removeItem('id');
  }

}
