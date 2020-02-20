import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from "@angular/router";

export class ErrorMessage implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router) {
    this.errorText = '';
  }

  errorText: string;
  emailText: string;
  passwordText: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  errorMessage = new ErrorMessage();

  ngOnInit() {
  }

  loginAdmin() {
    if (this.emailText === 'gb@gb.com' && this.passwordText === 'gbgbgb') {
      this.router.navigateByUrl('Home');
    } else {
      this.errorText = 'Invalid Email and Password';
    }
  }
}
