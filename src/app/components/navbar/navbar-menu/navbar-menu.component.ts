import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  @Input('titleMenu') title: string;
  constructor() { }

  ngOnInit() {
  }

  setFontSize(checkTitle): number {
    return (checkTitle === 'Download Karcis.co App' ||
            checkTitle === 'Promos' ||
            checkTitle === 'Help Center') ? 12 : 14;
  }

  setUnderline(checkTitle): string {
    return (checkTitle === 'Flight' ||
            checkTitle === 'Hotel' ||
            checkTitle === 'Train' ||
            checkTitle === 'Car Rental' ||
            checkTitle === 'Entertainment') ? 'block' : 'none';
  }

  setFontWeight(checkTitle): string {
    return (checkTitle === 'Tix Point' ||
            checkTitle === 'Check Order' ||
            checkTitle === 'Login' ||
            checkTitle === 'Register') ? 'bold' : 'none';
  }

}
