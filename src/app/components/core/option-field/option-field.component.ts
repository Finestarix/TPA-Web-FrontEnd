import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-option-field',
  templateUrl: './option-field.component.html',
  styleUrls: ['./option-field.component.scss']
})
export class OptionFieldComponent implements OnInit, AfterViewInit {

  @Input('inputForm') inputForm: any;
  @Output() sendToParent: EventEmitter<string> = new EventEmitter<string>();

  myLabel: HTMLElement;
  myInput: HTMLElement;

  borderStyle: string;
  errorMessage: string;
  valueInput: string;

  constructor() {
  }

  ngOnInit() {
    this.valueInput = '';
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);
    console.log(this.inputForm);
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

    } else if (this.inputForm.placeholder.toLowerCase().includes('email') &&
      this.inputForm.placeholder.toLowerCase().includes('mobile number')) {

      const ruleDigit = /^\d+$/;
      if (ruleDigit.test(this.valueInput)) {

        const rulePhone = /^[0-9]{11,13}$/;

        if (!rulePhone.test(this.valueInput)) {
          this.errorMessage = 'Enter Valid Phone Number Format.';
        }

      } else {

        const ruleEmail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

        if (!ruleEmail.test(this.valueInput)) {
          this.errorMessage = 'Enter Valid Email Format.';
        }

      }

    }

    if (this.errorMessage !== '') {
      this.borderStyle = 'Wrong';
    }

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
