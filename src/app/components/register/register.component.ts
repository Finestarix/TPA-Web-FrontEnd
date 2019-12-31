import { Component, OnInit } from '@angular/core';

import featureLoginRegister from '../../models/login-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  featureLoginRegister: object[];

  constructor() {
    this.featureLoginRegister = featureLoginRegister;
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

  emailData: object = {
    name: 'email',
    placeholder: 'Email'
  };

  firstNameData: object = {
    name: 'first-name',
    placeholder: 'First Name'
  };

  lastNameData: object = {
    name: 'last-name',
    placeholder: 'Last Name'
  };

  phoneData: object = {
    name: 'phone',
    placeholder: 'Mobile Phone'
  };

  passwordData: object = {
    name: 'password',
    placeholder: 'Password'
  };

  email: string;
  password: string;

  setPhoneEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  registerAction(): void {
    if (this.email !== 'Error' && this.password !== 'Error') {

    }
  }

  ngOnInit() {
  }

}
