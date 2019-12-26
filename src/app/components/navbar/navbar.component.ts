import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  menusLeft: string[] = [
    'Flight',
    'Hotel',
    'Train',
    'Car Rental',
    'Entertainment'
  ];

  menusRight: string[] = [
    'Tix Point',
    'Check Order',
    'Login',
    'Register'
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

  ngOnInit() {
  }


}
