import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {AdminService} from "../../../services/admin.service";
import {Subscription} from "rxjs";
import {SessionService} from "../../../services/session.service";

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

  constructor(private router: Router,
              private sessionAdmin: SessionService,
              private adminService: AdminService) {
    this.errorText = '';
  }

  adminLogin$: Subscription;
  adminLogin: any;

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
    this.adminLogin$ = this.adminService.getAdminLogin(this.emailText, this.passwordText).subscribe(async query => {
      await this.afterLoginAdmin(query);
    });
  }

  afterLoginAdmin(query) {
    this.adminLogin = query.data.AdminLogin.jwtToken;

    if (this.adminLogin === '') {
      this.errorText = 'Invalid Email and Password';
    } else {
      this.sessionAdmin.setSessionAdmin(this.adminLogin);
      this.router.navigateByUrl('Admin/Home');
    }
  }
}
