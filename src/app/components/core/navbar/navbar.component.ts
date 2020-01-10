import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginComponent} from '../../login/login.component';
import {RegisterComponent} from '../../register/register.component';

import {menusLeft, menusRight, menusTop, menusType, menusMoney, menusLanguage} from './navbar';
import {NameLink} from '../../../models/name-link';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menusLeft: NameLink[];
  menusRight: NameLink[];
  menusTop: NameLink[];
  menusType: string[];
  menusMoney: string[];
  menusLanguage: string[];

  navbarMenu: any;
  isOpen: boolean;

  private dialogRefLogin: MatDialogRef<LoginComponent>;
  private dialogRefRegister: MatDialogRef<RegisterComponent>;

  constructor(private dialogLogin: MatDialog,
              private sessionService: SessionService,
              private dialogRegister: MatDialog) {
    this.menusLeft = menusLeft;
    this.menusRight = menusRight;
    this.menusTop = menusTop;
    this.menusType = menusType;
    this.menusMoney = menusMoney;
    this.menusLanguage = menusLanguage;
    this.isOpen = false;
    console.log(sessionService.getSession());
  }

  ngOnInit() {
    this.navbarMenu = document.getElementsByClassName('navbar-menu');
  }

  loginAction(): void {
    this.dialogRefLogin = this.dialogLogin.open(LoginComponent);

    this.dialogRefLogin.afterClosed().subscribe(temp => {
      if (temp && temp.status === true) {
        this.dialogRefRegister = this.dialogRegister.open(RegisterComponent, {
          data: temp
        });
      }
    });
  }

  configNavbar(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      for (const items of this.navbarMenu) {
        items.setAttribute('style', 'display: block');
      }
    } else {
      for (const items of this.navbarMenu) {
        items.setAttribute('style', 'display: none');
      }
    }

  }

  isLoginRegister() {
    return (!this.sessionService.getSession() || this.sessionService.getSession() === undefined ) ? true : false;
  }

  isAlreadyLogin() {
    return !this.isLoginRegister();
  }

}
