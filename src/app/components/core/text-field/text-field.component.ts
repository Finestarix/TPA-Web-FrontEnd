import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, AfterViewInit {

  @Input('inputForm') inputForm: any;
  @Output() data: EventEmitter<string> = new EventEmitter<string>();

  myLabel: HTMLElement;
  myInput: HTMLElement;

  border: string;
  error: string;
  value: string;

  typeInput: string;

  setActive(): void {
    this.myInput.focus();
    this.border = 'Selected';
    this.myLabel.classList.add('active');
  }

  setText(): void {

    if (this.value === '') {

      this.data.emit('Error');
      this.border = 'Wrong';
      this.error = 'Please Enter ' + this.inputForm.placeholder + '.';

    } else {

      this.data.emit(this.value);
      this.border = '';
      this.error = '';

    }
  }

  setBorder(): string {
    return (this.border === 'Selected') ? '1px solid #0064d2' :
      (this.border === 'Wrong') ? '1px solid red' : '1px solid #c6cbda';
  }

  setColor(): string {
    return (this.border === 'Selected') ? '#0064d2' :
      (this.border === 'Wrong') ? 'red' : '#c6cbda';
  }

  constructor() {
  }

  ngOnInit() {
    this.value = '';
    this.typeInput = (this.inputForm.placeholder.toLowerCase().includes('password')) ? 'password' : 'text';
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);
  }

}
