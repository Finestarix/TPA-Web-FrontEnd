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

  handleLoginAction(): void {

    if (this.userLoginData.length === 0) {

      let chooseConfirm: any;
      chooseConfirm = confirm('Continue registering with ' + this.phoneemail + ' ?');

      if (chooseConfirm) {
        const sendUserLogin = {
          phoneemail: this.phoneemail,
          status: true
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

  loginAction(): void {

    if (this.phoneemail !== 'Error' && !this.isUserExist) {
      this.userLogin$ = this.loginService.getUser(this.phoneemail).subscribe(async query => {
        this.userLoginData = query.data.UserByEmailAndPhone;
        await this.handleLoginAction();
      });
    } else if (this.phoneemail !== 'Error' && this.password !== 'Error' && this.isUserExist) {
      console.log()
      this.userLogin$ = this.loginService.getValidUser(this.phoneemail, this.password).subscribe(async query => {
        this.userLoginData = query.data.UserLogin;
        await console.log(this.userLoginData);
      });
    }
  }

  googleSignIn(): void {
    this.googleSignInService.signIn();
    console.log(this.googleSignInService.getCurrUser());
    this.googleSignInService.signOut();
  }

}
