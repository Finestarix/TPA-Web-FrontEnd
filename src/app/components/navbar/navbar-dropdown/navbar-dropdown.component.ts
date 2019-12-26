import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent implements OnInit {

  @Input('type') typeComponent: string;
  @Input('menu') menuComponent: string;

  isText: boolean;
  isClick: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isText = (this.typeComponent === 'text') ? true : false;
    this.isClick = false;
  }

  setDisplay(): string {
    return (this.isClick) ? 'block' : 'none';
  }


}
