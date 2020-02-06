import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth.service';

import featureLoginRegister from '../../models/login-register';
import {phoneEmailData, passwordData} from './login';
import {Validator} from '../../helpers/validator';
import {SessionService} from '../../services/session.service';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/user';

declare const gapi: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  featureLoginRegister: object[];

  userLogin$: Subscription;
  userRegister$: Subscription;
  userLoginData: any;

  isUserExist: boolean;

  phoneemail: string;
  password: string;
  phoneEmailData: object;
  passwordData: object;

  errorText: string;

  private googleClientID: string;
  public auth2: any;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private loginService: LoginService,
              private registerService: RegisterService,
              private sessionService: SessionService,
              private authService: AuthService,
              private element: ElementRef) {
    this.featureLoginRegister = featureLoginRegister;
    this.isUserExist = false;
    this.phoneemail = this.password = '';
    this.phoneEmailData = phoneEmailData;
    this.passwordData = passwordData;
    this.googleClientID = '336495925518-defp19eeubg3kq7erdlna5n7bteffog0.apps.googleusercontent.com';
  }

  ngOnInit() {
    this.googleInit();
    this.facebookInit();
  }

  ngOnDestroy(): void {
    if (this.userLogin$) {
      this.userLogin$.unsubscribe();
    }
  }

  googleInit() {
    const that = this;
    gapi.load('auth2', () => {
      that.auth2 = gapi.auth2.init({
        client_id: that.googleClientID,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachGoogleSignIn(that.element.nativeElement.querySelector('#gapi'));
    });
  }

  facebookInit() {
    FB.init({
      appId: '807634042995508',
      cookie: false,
      xfbml: true,
      version: 'v5.0'
    });
  }

  setPhonePhoneEmail(email: string): void {
    this.phoneemail = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  handleSearchUser(query): void {

    this.userLoginData = query.data.UserByEmailAndPhone;

    if (this.userLoginData.id === 0) {

      if (confirm('Continue registering with ' + this.phoneemail + ' ?')) {
        this.dialogRef.close({
          phoneemail: this.phoneemail,
          status: true,
          data: (Validator.isNumeric(this.phoneemail)) ? 'phone' : 'email',
        });
      }

    } else if (!this.isUserExist) {

      document.getElementById('password').style.display = 'block';
      this.isUserExist = true;

    }
  }

  handleUserLogin(query): void {

    this.userLoginData = query.data.UserLogin;

    if (this.userLoginData.id === 0) {
      this.setError('Email or password doesn\'t match !');
    } else {

      // TODO: Add JWT TOKEN

      // const loggedInUser: User = {
      //   id: this.userLoginData.id,
      //   email: this.userLoginData.email
      // };
      // this.authService.setUser(loggedInUser);

      this.sessionService.setSession(this.userLoginData.id);
      this.dialogRef.close();
    }

  }

  checkValidity(checkData: string): boolean {
    return checkData !== 'Error' &&
      !Validator.isNoValue(checkData);
  }

  setError(error: string): void {
    this.errorText = error;

    document.getElementById('error-text').classList.add('pop-up-error-show');
    setTimeout(() => {
      document.getElementById('error-text').classList.remove('pop-up-error-show');
    }, 2000);
  }

  loginAction(): void {

    if ((!this.checkValidity(this.phoneemail) && !this.isUserExist) ||
      (!this.checkValidity(this.password) && this.isUserExist)) {
      this.setError('Fill All Field !');
      return;
    }

    if (this.checkValidity(this.phoneemail) &&
      !this.isUserExist) {

      this.errorText = '';

      this.phoneemail = (this.phoneemail[0] === '0') ? this.phoneemail.substring(1) : this.phoneemail;
      this.userLogin$ = this.loginService.getUser(this.phoneemail).subscribe(async query => {
        await this.handleSearchUser(query);
      });

    } else if (this.checkValidity(this.phoneemail) &&
      this.checkValidity(this.password) &&
      this.isUserExist) {

      this.errorText = '';

      this.phoneemail = (this.phoneemail[0] === '0') ? this.phoneemail.substring(1) : this.phoneemail;
      this.userLogin$ = this.loginService.getValidUser(this.phoneemail, this.password).subscribe(async query => {
        await this.handleUserLogin(query);
      });

    }
  }

  handleAPIUser(query, id, name, image, email) {
    this.userLoginData = query.data.UserByEmailAndPhone;
    console.log(this.userLoginData);

    if (this.userLoginData.id === 0) {

      const firstName = name.substring(0, name.indexOf(' '));
      const lastName = name.substring(name.indexOf(' ') + 1);

      this.userRegister$ = this.registerService
        .insertUser(email, firstName, lastName, '+62', '', '', image)
        .subscribe(async value => {
          this.userLoginData = value.data.InsertNewUser;
        });

    } else {

      // TODO: Add JWT TOKEN
      this.sessionService.setSession(this.userLoginData.id);
      this.dialogRef.close();
    }
  }

  attachGoogleSignIn(element) {
    const that = this;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        const profile = googleUser.getBasicProfile();

        const idGoogle = profile.getId();
        const nameGoogle = profile.getName();
        const imageGoogle = profile.getName();
        const emailGoogle = profile.getEmail();

        this.userLogin$ = this.loginService.getUser(emailGoogle).subscribe(async query => {
          await this.handleAPIUser(query, idGoogle, nameGoogle, imageGoogle, emailGoogle);
        });

      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  attachFacebookSignIn() {
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log(response.authResponse.userID);
        FB.api(
          '/me',
          {fields: 'name, id, picture.width(150).height(150), email'},
          (userData) => {
            const idFacebook = userData.id;
            const nameFacebook = userData.name;
            const imageFacebook = userData.picture;
            const emailFacebook = userData.email;

            this.userLogin$ = this.loginService.getUser(emailFacebook).subscribe(async query => {
              await this.handleAPIUser(query, idFacebook, nameFacebook, '', emailFacebook);
            });
          }
        );
      } else {
        console.log('User login failed');
      }
    }, {});
  }

  googleSignIn(): void {
    const that = this;
    this.attachGoogleSignIn(that.element.nativeElement.querySelector('#gapi'));
  }

  facebookSignIn(): void {
    this.attachFacebookSignIn();
  }

}
