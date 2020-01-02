import {AfterViewInit, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit, AfterViewInit {

  @Input('inputForm') inputForm: any;
  @Output() sendToParent: EventEmitter<string> = new EventEmitter<string>();

  myLabel: HTMLElement;
  myInput: HTMLElement;
  myImage: HTMLElement;

  borderStyle: string;
  errorMessage: string;
  valueInput: string;

  isPassMode: string;

  constructor() {
  }

  ngOnInit() {
    this.valueInput = '';
    this.isPassMode = 'password';
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);
    this.myImage = document.getElementById('image-eye');
  }

  setActive(): void {
    this.myInput.focus();
    this.borderStyle = 'Selected';
    this.myLabel.classList.add('activeLabel');
  }

  setText(): void {

    this.borderStyle = '';
    this.errorMessage = '';

    if (this.valueInput === '') {

      this.errorMessage = 'Please Enter ' + this.inputForm.placeholder + '.';

    } else {

      const rulePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

      if (!rulePassword.test(this.valueInput)) {
        this.errorMessage = 'Min. 8 Character & Alphanumeric.';
      }

    }

    if (this.errorMessage !== '') {
      this.borderStyle = 'Wrong';
    }

    this.sendToParent.emit((this.borderStyle === 'Wrong') ? 'Error' : this.valueInput);
  }

  changeState(): void {
    this.isPassMode = (this.isPassMode === 'password') ? 'text' : 'password';
    this.myImage.setAttribute('src', (this.isPassMode === 'text') ?
      'assets/core/eye-passwordfield-off.png' : 'assets/core/eye-passwordfield-on.png');
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
