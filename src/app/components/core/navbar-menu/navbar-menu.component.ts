import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  hover: boolean;
  routerable: string[] = [
    'Flight',
    'Train',
    'Hotel'
  ];
  isRouterable: boolean;

  @Input('titleMenu') title: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isRouterable = false;

    for(const curr of this.routerable) {
      if(curr === this.title) {
        this.isRouterable = true;
      }
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

  toRouter(): void {
    this.router.navigateByUrl('/' + this.title);
  }
}
