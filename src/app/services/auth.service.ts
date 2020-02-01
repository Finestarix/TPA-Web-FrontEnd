import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = '';

  constructor(private router: Router,
              private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An Error Occurred: ', error.error.message);
    } else {
      console.error(
        'Return Code: ${error.status},' +
        'Body: ${error.error}'
      );
    }
    return throwError('Error Occurred!')
  }

  setUser(resp: User) {
    localStorage.setItem('access-token', resp.accessToken);
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('access-token') != null;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getData(data): Observable<User> {
    return this.http
      .post<User>('http://localhost:4201/', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
