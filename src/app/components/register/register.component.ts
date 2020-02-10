import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {PhonecodeService} from '../../services/phonecode.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import featureLoginRegister from '../../models/login-register';
import {emailData, firstNameData, lastNameData, phoneData, passwordData} from './register';
import {Validator} from '../../helpers/validator';
import {UserService} from '../../services/user.service';
import {SessionService} from '../../services/session.service';

declare const gapi: any;
declare var FB: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  featureLoginRegister: object[];
  userLogin$: Subscription;
  userRegister$: Subscription;
  userRegister: any;
  userLoginData: any;

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

  private googleClientID: string;
  public auth2: any;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(@Inject(MAT_DIALOG_DATA) private dataFromLogin,
              private dialogRef: MatDialogRef<RegisterComponent>,
              private sessionService: SessionService,
              private phonecodeService: PhonecodeService,
              private userService: UserService,
              private router: Router,
              private http: HttpClient,
              private element: ElementRef) {
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

    this.googleClientID = '336495925518-defp19eeubg3kq7erdlna5n7bteffog0.apps.googleusercontent.com';
  }

  ngOnInit() {
    this.phoneCode$ = this.phonecodeService.getPhoneCode().subscribe(async query => {
      await this.afterFetchData(query);
    });

    this.googleInit();
    this.facebookInit();
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
      this.userRegister$ = this.userService
        .insertUser(this.email, this.firstName, this.lastName, this.phoneCode, this.phone, this.password, '')
        .subscribe(async value => {
          await this.getNewUser(value);
        });
      this.router.navigateByUrl('');
      return;
    }
  }

  handleAPIUser(query, id, name, image, email) {
    this.userLoginData = query.data.UserByEmailAndPhone;
    console.log(this.userLoginData);

    if (this.userLoginData.id === 0) {

      const firstName = name.substring(0, name.indexOf(' '));
      const lastName = name.substring(name.indexOf(' ') + 1);

      console.log('>>' + image);

      this.userRegister$ = this.userService
        .insertUser(email, firstName, lastName, '+62', '', '', image)
        .subscribe(async value => {
          this.userLoginData = value.data.InsertNewUser;
        });

      this.router.navigateByUrl('');

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
        const imageGoogle = profile.getImageUrl();
        console.log(imageGoogle);
        const emailGoogle = profile.getEmail();

        this.userLogin$ = this.userService.getUser(emailGoogle).subscribe(async query => {
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
            const emailFacebook = userData.email;

            this.userLogin$ = this.userService.getUser(emailFacebook).subscribe(async query => {
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
