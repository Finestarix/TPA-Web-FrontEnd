import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent implements OnInit {

  @Input('typeDropdown') typeDropdown: string;
  @Input('dataDropdown') dataDropdown: any;

  isTextType: boolean;
  isClick: boolean;

  constructor() {
  }

  ngOnInit() {
    this.isTextType = (this.typeDropdown === 'text') ? true : false;
    this.isClick = false;
  }

  setDisplay(): string {
    return (this.isClick) ? 'block' : 'none';
  }


}
