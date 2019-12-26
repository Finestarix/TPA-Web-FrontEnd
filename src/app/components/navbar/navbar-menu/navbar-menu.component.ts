import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginComponent} from '../../login/login.component';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  hover: boolean;
  isLogin: boolean;
  isRegister: boolean;

  @Input('titleMenu') title: string;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.hover = this.isLogin = this.isRegister = false;

    if (this.title === 'Login') {
      this.isLogin = true;
    }
  }

  loginAction(): void {
    this.dialog.open(LoginComponent);
  }

  setFontSize(checkTitle): number {
    return (checkTitle === 'Download Karcis.co App' ||
      checkTitle === 'Promos' ||
      checkTitle === 'Help Center') ? 12 : 14;
  }

  setUnderline(checkTitle): string {
    if (checkTitle !== 'Flight' &&
      checkTitle !== 'Hotel' &&
      checkTitle !== 'Train' &&
      checkTitle !== 'Car Rental' &&
      checkTitle !== 'Entertainment') {
      this.hover = false;
    }
    return (this.hover === true) ? 'royalblue' : 'transparent';
  }

  setFontWeight(checkTitle): string {
    return (checkTitle === 'Tix Point' ||
      checkTitle === 'Check Order' ||
      checkTitle === 'Login' ||
      checkTitle === 'Register') ? 'bold' : 'none';
  }

}
