import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {GoogleSigninService} from '../../services/google-signin.service';

import featureLoginRegister from '../../models/login-register';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  featureLoginRegister: object[];

  userLogin$: Subscription;
  userLoginData: any;
  isUserExist: boolean;

  phoneemail: string;
  phoneEmailData: object = {
    name: 'phone-email',
    placeholder: 'Mobile Number or Email'
  };

  password: string;
  passwordData: object = {
    name: 'password',
    placeholder: 'Password'
  };

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private loginService: LoginService,
              private googleSignInService: GoogleSigninService) {
    this.featureLoginRegister = featureLoginRegister;
    this.isUserExist = false;
    this.phoneemail = this.password = '';
  }

  ngOnInit() {
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

  handleSearchUser(): void {

    if (this.userLoginData.length === 0) {

      let chooseConfirm: any;
      chooseConfirm = confirm('Continue registering with ' + this.phoneemail + ' ?');

      if (chooseConfirm) {

        const sendUserLogin = {
          phoneemail: this.phoneemail,
          status: true,
          data: (/^\d+$/.test(this.phoneemail)) ? 'phone' : 'email',
        };

        this.dialogRef.close(sendUserLogin);
      }

    } else if (!this.isUserExist) {

      let passwordField: HTMLElement;
      passwordField = document.getElementById('password');
      passwordField.style.display = 'block';

      this.isUserExist = true;

    }
  }

  handleUserLogin(): void {

    if (this.userLoginData.length === 0) {
      alert('Email or password doesn\'t match. !');
    } else {
      // Success Login
    }

  }

  loginAction(): void {

    if (this.phoneemail !== 'Error' && this.phoneemail !== '' && !this.isUserExist) {

      if (this.phoneemail[0] === '0') {
        this.phoneemail = this.phoneemail.substring(1);
      }

      this.userLogin$ = this.loginService.getUser(this.phoneemail).subscribe(async query => {
        this.userLoginData = query.data.UserByEmailAndPhone;
        await this.handleSearchUser();
      });

    } else if (this.phoneemail !== 'Error' && this.phoneemail !== '' &&
      this.password !== 'Error' && this.password !== '' && this.isUserExist) {

      if (this.phoneemail[0] === '0') {
        this.phoneemail = this.phoneemail.substring(1);
      }

      this.userLogin$ = this.loginService.getValidUser(this.phoneemail, this.password).subscribe(async query => {
        this.userLoginData = query.data.UserLogin;
        await this.handleUserLogin();
      });
    }
  }

  googleSignIn(): void {
    this.googleSignInService.signIn();
    console.log(this.googleSignInService.getCurrUser());
    this.googleSignInService.signOut();
  }

}
