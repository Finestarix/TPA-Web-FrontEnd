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
  valueInput: string;
  phoneList: HTMLCollectionOf<Element>;

  constructor() {
  }

  ngOnInit() {
    this.valueInput = '';
  }

  ngAfterViewInit(): void {
    this.myInput = document.getElementById(this.inputForm.name);
    this.myLabel = document.getElementById('label-' + this.inputForm.name);

    this.phoneList = document.getElementsByClassName('phonecode-list');
    // @ts-ignore
    for (const currPhone of this.phoneList) {
      if (currPhone.textContent.includes(this.inputForm.default)) {
        currPhone.setAttribute('selected', '');
      }
    }

  }

  setActive(): void {
    this.borderStyle = 'Selected';
  }

  setPassive(): void {
    this.borderStyle = '';
  }

  setData(event): void {
    this.sendToParent.emit(event.path[0].value.substring(0, event.path[0].value.indexOf('-') - 1));
  }

  setBorder(): string {
    return (this.borderStyle === 'Selected') ? '1px solid #0064d2' : '1px solid #c6cbda';
  }

  setColor(): string {
    return (this.borderStyle === 'Selected') ? '#0064d2' : '#c6cbda';
  }

}
