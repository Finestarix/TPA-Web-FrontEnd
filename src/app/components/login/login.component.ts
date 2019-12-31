import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {GoogleSigninService} from '../../services/google-signin.service';

import featureLoginRegister from '../../models/login-register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  featureLoginRegister: object[];

  userLogin$: Subscription;
  userLoginData: any;

  phoneEmailData: object = {
    name: 'phone-email',
    placeholder: 'Mobile Number or Email'
  };

  passwordData: object = {
    name: 'password',
    placeholder: 'Password'
  };

  phoneemail: string;
  password: string;

  constructor(private loginService: LoginService,
              private googleSignInService: GoogleSigninService) {
    this.featureLoginRegister = featureLoginRegister;
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

  loginAction(): void {
    this.userLogin$ = this.loginService.getUser(this.phoneemail).subscribe(async query => {
      this.userLoginData = query.data.UserByEmailAndPhone;
      await console.log(this.userLoginData);
    });
  }

  googleSignIn(): void {
    this.googleSignInService.signIn();
    console.log(this.googleSignInService.getCurrUser());
    this.googleSignInService.signOut();
  }

}
