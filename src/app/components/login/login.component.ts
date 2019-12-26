import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  features: object[] = [
    {
      title: 'Smart Profile',
      image: 'smart-profile.webp',
      content: 'Book faster with one tap to fill all passengers details.'
    },
    {
      title: 'TIX Point & TIX Spot',
      image: 'tix.webp',
      content: 'Get and collect it, then redeem for rewards or discount.'
    },
    {
      title: 'Smart Pay',
      image: 'smart-pay.webp',
      content: 'Handle payment and transaction in a fast and secure way.'
    },
    {
      title: 'Smart Reschedule & Refund List',
      image: 'scheduler.webp',
      content: 'No more complicated rescheduling and refund process.'
    }
  ];

  inputForm: object = {
    name: 'login-input',
    placeholder: 'Mobile Number or Email'
  };

  ngOnInit() {
  }

}
