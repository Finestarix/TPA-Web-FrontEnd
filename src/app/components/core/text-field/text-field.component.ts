import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validator} from './../../../helpers/validator';

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

  widthDiv: number;
  errorMessage: string;
  valueInput: string;

  constructor() {
  }

  ngOnInit() {
    this.valueInput = '';
    this.widthDiv = (this.inputForm.width !== undefined) ? this.inputForm.width : 220;
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

    this.borderStyle = '';
    this.errorMessage = '';

    if (Validator.isNoValue(this.valueInput)) {
      this.errorMessage = 'Please Enter ' + this.inputForm.placeholder + '.';

    } else if (Validator.isContainEmail(this.inputForm.placeholder) &&
      Validator.isContainPhone(this.inputForm.placeholder)) {

      this.errorMessage =
        (Validator.isNumeric(this.valueInput)) ?
          (!Validator.validatePhoneRule(this.valueInput)) ?
            'Enter Valid Phone Number Format.' : ''
          :
          (!Validator.validateEmailRule(this.valueInput)) ?
            'Enter Valid Email Format.' : '';

    } else if (Validator.isContainEmail(this.inputForm.placeholder)) {

      this.errorMessage =
        (!Validator.validateEmailRule(this.valueInput)) ?
          'Enter Valid Email Format.' : '';

    } else if (Validator.isContainPhone(this.inputForm.placeholder)) {

      this.errorMessage =
        (!Validator.validatePhoneRule(this.valueInput)) ?
          'Enter Valid Phone Number Format.' : '';

    }

    this.borderStyle = (this.errorMessage !== '') ? 'Wrong' : '';
    this.sendToParent.emit((this.borderStyle === 'Wrong') ? 'Error' : this.valueInput);
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
