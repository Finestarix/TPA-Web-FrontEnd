import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {checkTopLeftMenu, checkMainMenu, checkOtherMenu, routable} from './custom-menu-link';
import {NameLink} from '../../../models/name-link';

@Component({
  selector: 'app-custom-menu-link',
  templateUrl: './custom-menu-link.component.html',
  styleUrls: ['./custom-menu-link.component.scss']
})
export class CustomMenuLinkComponent implements OnInit {

  @Input('titleMenu') titleMenu: NameLink;

  styleHover: boolean;
  isRoutable: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isRoutable = false;

    if (this.titleMenu.link === '') {
      this.isRoutable = true;
    }

  }

  setFontSize(checkTitle): number {
    return (checkTopLeftMenu(checkTitle)) ? 12 : 14;
  }

  setUnderline(checkTitle): string {
    if (checkMainMenu(checkTitle)) {
      this.styleHover = false;
    }
    return (this.styleHover === true) ? 'royalblue' : 'transparent';
  }

  setFontWeight(checkTitle): string {
    return (checkOtherMenu(checkTitle)) ? 'bold' : 'none';
  }

  setRouter(): void {
    this.router.navigateByUrl('/' + this.titleMenu.name.trim());
  }

}
