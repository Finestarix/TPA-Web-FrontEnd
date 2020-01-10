import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {MatDialogRef} from '@angular/material';

import featureLoginRegister from '../../models/login-register';
import {phoneEmailData, passwordData} from './login';
import {Validator} from '../../helpers/validator';
import {SessionService} from '../../services/session.service';
import {RegisterService} from '../../services/register.service';
import {HttpClient} from '@angular/common/http';

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
      this.setError('Login Success!');
      // TODO: `Refresh and Change Navbar`
      this.sessionService.setSession(this.userLoginData.id);
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

  handleGoogleUser(query, profile) {
    this.userLoginData = query.data.UserByEmailAndPhone;

    if (this.userLoginData.id === 0) {

      // TODO: `Google User Found`
      this.userRegister$ = this.registerService
        .insertUser(profile.getEmail(), profile.getName().substring(0, profile.getName().indexOf(' ')),
          profile.getName().substring(profile.getName().indexOf(' ') + 1), '0', '0', profile.getToken())
        .subscribe(async value => {
          this.userLoginData = value.data.InsertNewUser;
        });

    } else {

      // TODO: `Google User Not Found`


    }
  }

  attachGoogleSignIn(element) {
    const that = this;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // this.userLogin$ = this.loginService.getUser(profile.getEmail()).subscribe(async query => {
        //   await this.handleGoogleUser(query, profile);
        // });

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
          'GET',
          {},
          (userData) => {
            console.table(userData);
          }
        );
        //   FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id,picture.width(150).height(150),email' },
        //     (res) => {
        //       this.imgPath = res.picture.data.url;
        //       console.log(this.imgPath);
        //       console.log(res);
        //     });
      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});
  }

  googleSignIn(): void {
    this.attachGoogleSignIn(this);
  }

  facebookSignIn(): void {
    this.attachFacebookSignIn();
  }

}
