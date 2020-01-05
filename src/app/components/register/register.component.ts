import {Component, Inject, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Subscription} from 'rxjs';

import featureLoginRegister from '../../models/login-register';
import {emailData, firstNameData, lastNameData, phoneData, passwordData} from './register';
import {Validator} from '../../helpers/validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  featureLoginRegister: object[];

  userRegister$: Subscription;
  userRegister: any;

  phoneCode$: any;
  phoneCodeCountry: any;

  email: string;
  lastName: string;
  firstName: string;
  phoneCode: string;
  phone: string;
  password: string;

  firstNameData: object;
  emailData: object;
  lastNameData: object;
  phoneCodeData: object;
  phoneData: object;
  passwordData: object;

  isEmail: boolean;
  location: any;

  errorText: string;

  constructor(@Inject(MAT_DIALOG_DATA) private dataFromLogin,
              private registerService: RegisterService,
              private http: HttpClient) {
    this.featureLoginRegister = featureLoginRegister;
    this.isEmail = (dataFromLogin.data === 'email') ? true : false;
    this.http.get<any>('https://ipapi.co/json/').subscribe(async data => {
      this.location = data;
    });

    this.email = '';
    this.lastName = '';
    this.firstName = '';
    this.phoneCode = '';
    this.phone = '';
    this.password = '';

    this.emailData = emailData;
    this.firstNameData = firstNameData;
    this.lastNameData = lastNameData;
    this.phoneData = phoneData;
    this.passwordData = passwordData;
  }

  ngOnInit() {
    this.phoneCode$ = this.registerService.getPhoneCode().subscribe(async query => {
      await this.afterFetchData(query);
    });
  }

  afterFetchData(query): void {
    this.phoneCodeCountry = query.data.AllPhoneCode;

    this.http.get<any>('https://ipapi.co/json/').subscribe(async locationData => {
      await this.finalFetchData(locationData);
    });

  }

  finalFetchData(locationData): void {

    this.location = locationData;

    this.phoneCodeData = {
      name: 'phone-code',
      placeholder: 'Code',
      width: 90,
      default: this.location.country_calling_code,
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
    console.log(phoneCode);
    this.phoneCode = phoneCode;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  checkValidity(checkData: string): boolean {
    return checkData !== 'Error' &&
      !Validator.isNoValue(checkData);
  }

  getNewUser(value) {
    this.userRegister = value.data.InsertNewUser;
  }

  setError(error: string): void {
    this.errorText = error;

    document.getElementById('error-text').classList.add('pop-up-error-show');
    setTimeout(() => {
      document.getElementById('error-text').classList.remove('pop-up-error-show');
    }, 2000);
  }

  registerAction(): void {

    if (this.dataFromLogin.data === 'email') {
      this.email = this.dataFromLogin.phoneemail;
    } else if (this.dataFromLogin.data === 'phone') {
      this.phone = this.dataFromLogin.phoneemail;
    }

    if (this.phoneCode === '') {
      this.phoneCode = this.location.country_calling_code;
    }

    if (!this.checkValidity(this.email) ||
      !this.checkValidity(this.firstName) ||
      !this.checkValidity(this.lastName) ||
      !this.checkValidity(this.phoneCode) ||
      !this.checkValidity(this.phone) ||
      !this.checkValidity(this.password)) {
      this.setError('Fill All Field !');
      return;
    }

    if (this.checkValidity(this.email) &&
      this.checkValidity(this.firstName) &&
      this.checkValidity(this.lastName) &&
      this.checkValidity(this.phoneCode) &&
      this.checkValidity(this.phone) &&
      this.checkValidity(this.password)) {
      this.userRegister$ = this.registerService
        .insertUser(this.email, this.firstName, this.lastName, this.phoneCode, this.phone, this.password)
        .subscribe(async value => {
          await this.getNewUser(value);
        });
      this.setError('Register Success !');
      return;
    }
  }

}
