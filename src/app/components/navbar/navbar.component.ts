import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

}
