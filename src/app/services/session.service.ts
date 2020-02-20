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

  setSessionAdmin(value: string) {
    sessionStorage.setItem('id-admin',  value);
    this.router.navigateByUrl('Admin/Home');
  }

  getSessionAdmin() {
    return sessionStorage.getItem('id-admin');
  }

  removeSessionAdmin() {
    sessionStorage.removeItem('id-admin');
  }

}
