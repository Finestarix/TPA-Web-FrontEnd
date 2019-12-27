import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.hover = this.isLogin = this.isRegister = false;

    if (this.title === 'Login') {
      this.isLogin = true;
    }
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
