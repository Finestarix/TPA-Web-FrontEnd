import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  @Input('inputForm') inputForm: any;

  myLabel: HTMLElement;
  myInput: HTMLElement;

  changeLabel(): void {
    this.myInput.classList.add('active');
  }

  constructor() {
  }

  ngOnInit() {
    this.myLabel = document.getElementById('text-input');
    this.myInput = document.getElementById('label-input');
  }

}
