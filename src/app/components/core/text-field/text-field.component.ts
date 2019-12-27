import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, AfterViewInit {

  @Input('inputForm') inputForm: any;

  myLabel: HTMLElement;
  myInput: HTMLElement;

  changeLabel(): void {
    if (this.myLabel) {
      this.myLabel.classList.add('active');
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);
    console.log(this.myInput);
  }

}
