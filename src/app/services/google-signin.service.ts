import {Injectable, NgZone} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {

  public static readonly SESSION_STORAGE_KEY: string = 'accessToken';

  private currUser: GoogleUser = undefined;
  public getCurrUser(): GoogleUser {
    return this.currUser;
  }

  constructor(private googleAuthService: GoogleAuthService,
              private ngZone: NgZone) {
  }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(
        googleUser => {
          this.ngZone.run(() => {
            this.currUser = googleUser;
            sessionStorage.setItem(
              GoogleSigninService.SESSION_STORAGE_KEY, googleUser.getAuthResponse().access_token
            );
          });
        },
        error => {
          console.warn(error);
        }
      );
    });
  }

  public signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem(GoogleSigninService.SESSION_STORAGE_KEY);
    });
  }

  public getToken(): string {
    const token: string = sessionStorage.getItem(GoogleSigninService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(GoogleSigninService.SESSION_STORAGE_KEY);
  }


  //
  // public isUserSignedIn(): boolean {
  //   return !_.isEmpty(sessionStorage.getItem(GoogleSigninService.SESSION_STORAGE_KEY));
  // }

}
