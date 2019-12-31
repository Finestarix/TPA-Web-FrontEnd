import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../login/login.component';
import {RegisterComponent} from '../../register/register.component';

import {menusLeft, menusRight, menusTop, menusType, menusMoney, menusLanguage} from './navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menusLeft: string[];
  menusRight: string[];
  menusTop: string[];
  menusType: string[];
  menusMoney: string[];
  menusLanguage: string[];

  navbarMenu: any;
  isOpen: boolean;

  constructor(private dialogLogin: MatDialog, private dialogRegister: MatDialog) {
    this.menusLeft = menusLeft;
    this.menusRight = menusRight;
    this.menusTop = menusTop;
    this.menusType = menusType;
    this.menusMoney = menusMoney;
    this.menusLanguage = menusLanguage;
    this.isOpen = false;
  }

  ngOnInit() {
    this.navbarMenu = document.getElementsByClassName('navbar-menu');
  }

  loginAction(): void {
    this.dialogLogin.open(LoginComponent);
  }

  registerAction(): void {
    this.dialogRegister.open(RegisterComponent);
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


}
