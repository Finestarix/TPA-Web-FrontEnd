import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, AfterViewInit {

  @Input('inputForm') inputForm: any;
  @Output() sendToParent: EventEmitter<string> = new EventEmitter<string>();

  myLabel: HTMLElement;
  myInput: HTMLElement;

  borderStyle: string;
  errorMessage: string;
  valueInput: string;
  typeInput: string;

  constructor() {
  }

  ngOnInit() {
    this.valueInput = '';
    this.typeInput = (this.inputForm.placeholder.toLowerCase().includes('password')) ? 'password' : 'text';
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);
  }

  setActive(): void {
    this.myInput.focus();
    this.borderStyle = 'Selected';
    this.myLabel.classList.add('activeLabel');
  }

  setText(): void {

    if (this.valueInput === '') {

      this.sendToParent.emit('Error');
      this.borderStyle = 'Wrong';
      this.errorMessage = 'Please Enter ' + this.inputForm.placeholder + '.';

    } else {

      this.sendToParent.emit(this.valueInput);
      this.borderStyle = '';
      this.errorMessage = '';

    }
  }

  setBorder(): string {
    return (this.borderStyle === 'Selected') ? '1px solid #0064d2' :
      (this.borderStyle === 'Wrong') ? '1px solid red' : '1px solid #c6cbda';
  }

  setColor(): string {
    return (this.borderStyle === 'Selected') ? '#0064d2' :
      (this.borderStyle === 'Wrong') ? 'red' : '#c6cbda';
  }

}
