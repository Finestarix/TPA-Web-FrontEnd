import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog, private dialog2: MatDialog) {
    this.isOpen = false;
  }

  NavbarMenu: any;
  isOpen: boolean;


  menusLeft: string[] = [
    'Flight',
    'Hotel',
    'Train',
    'Car Rental',
    'Entertainment'
  ];

  menusRight: string[] = [
    'Tix Point',
    'Check Order'
  ];

  menusTop: string[] = [
    'Download Karcis.co App',
    'Promos',
    'Help Center'
  ];

  menusLanguage: any[] = [
    {
      image: 'ID-Flag',
      name: 'Bahasa Indonesia'
    },
    {
      image: 'US-Flag',
      name: 'English'
    }
  ];

  menusMoney: string[] = [
    'IDR - Indonesia Rupiah',
    'SGD - Singapore Dollar'
  ];

  menusType: string[] = [
    'text',
    'image'
  ];

  loginAction(): void {
    this.dialog.open(LoginComponent);
  }

  registerAction(): void {
    this.dialog2.open(RegisterComponent);
  }

  configNavbar(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      for (const items of this.NavbarMenu) {
        items.setAttribute('style', 'display: block');
      }
    } else {
      for (const items of this.NavbarMenu) {
        items.setAttribute('style', 'display: none');
      }
    }
  }

  ngOnInit() {
    this.NavbarMenu = document.getElementsByClassName('navbar-menu');
  }


}
