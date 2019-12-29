import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleAuthService, GoogleApiService} from 'ng-gapi';
import {Subscription, Observable} from 'rxjs';
import {UserLogin} from '../../models/user-login';
import {LoginService} from '../../services/login.service';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {GoogleSigninService} from '../../services/google-signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userLogin$: Observable<UserLogin>;
  userLoginData: UserLogin;

  constructor(private loginService: LoginService,
              private googleSignInService: GoogleSigninService,
              private apollo: Apollo) {
  }

  features: object[] = [
    {
      title: 'Smart Profile',
      image: 'smart-profile.webp',
      content: 'Book faster with one tap to fill all passengers details.'
    },
    {
      title: 'TIX Point & TIX Spot',
      image: 'tix.webp',
      content: 'Get and collect it, then redeem for rewards or discount.'
    },
    {
      title: 'Smart Pay',
      image: 'smart-pay.webp',
      content: 'Handle payment and transaction in a fast and secure way.'
    },
    {
      title: 'Smart Reschedule & Refund List',
      image: 'scheduler.webp',
      content: 'No more complicated rescheduling and refund process.'
    }
  ];

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

  setPhonePhoneEmail(email: string): void {
    this.phoneemail = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  loginAction(): void {
    console.log(this.phoneemail + ' ' + this.password);
  }

  googleSignIn(): void {
    this.googleSignInService.signIn();
    console.log(this.googleSignInService.getCurrUser());
    this.googleSignInService.signOut();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
