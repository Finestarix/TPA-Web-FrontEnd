import {Component, Inject, OnInit} from '@angular/core';

import featureLoginRegister from '../../models/login-register';
import {MAT_DIALOG_DATA} from '@angular/material';
import {RegisterService} from '../../services/register.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  featureLoginRegister: object[];

  email: string;
  emailData: object = {
    name: 'email',
    placeholder: 'Email'
  };

  firstName: string;
  firstNameData: object = {
    name: 'first-name',
    placeholder: 'First Name'
  };

  lastName: string;
  lastNameData: object = {
    name: 'last-name',
    placeholder: 'Last Name'
  };

  phoneCode: string;
  phoneCode$: any;
  phoneCodeCountry: any;
  phoneCodeData: object;

  phone: string;
  phoneData: object = {
    name: 'phone',
    placeholder: 'Mobile Phone'
  };

  password: string;
  passwordData: object = {
    name: 'password',
    placeholder: 'Password'
  };

  isEmail: boolean;
  isDone: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private dataFromLogin,
              private registerService: RegisterService) {
    this.isDone = false;
    this.featureLoginRegister = featureLoginRegister;
    this.isEmail = (dataFromLogin.data === 'email') ? true : false;
  }

  ngOnInit() {
    this.phoneCode$ = this.registerService.getPhoneCode().subscribe(async query => {
      this.phoneCodeCountry = query.data.AllPhoneCode;
      this.afterFetchData();
    });
  }

  afterFetchData(): void {
    this.isDone = true;
    this.phoneCodeData = {
      name: 'phone-code',
      placeholder: 'Phone Code',
      data: this.phoneCodeCountry,
    };
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  setPhoneCode(phoneCode: string): void {
    this.phoneCode = phoneCode;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  registerAction(): void {
    if (this.email !== 'Error' &&
      this.firstName !== 'Error' &&
      this.lastName !== 'Error' &&
      this.phoneCode !== 'Error' &&
      this.phone !== 'Error' &&
      this.password !== 'Error' &&
      this.email !== '' &&
      this.firstName !== '' &&
      this.lastName !== '' &&
      this.phoneCode !== '' &&
      this.phone !== '' &&
      this.password !== '') {

    }
  }

}
