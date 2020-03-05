import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {SessionService} from "../../../../services/session.service";
import {SubscriptionService} from "../../../../services/subscription.service";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  selectedTitle: FormControl = new FormControl();
  selectedFirstName: FormControl = new FormControl();
  selectedLastName: FormControl = new FormControl();
  selectedCity: FormControl = new FormControl();
  selectedAddress: FormControl = new FormControl();
  selectedZipCode: FormControl = new FormControl();

  constructor(private userService: UserService,
              private sessionService: SessionService,
              private subscriptionService: SubscriptionService) { }

  ngOnInit() {
  }

  updateAction() {

    if (this.selectedTitle.invalid || this.selectedFirstName.invalid || this.selectedLastName.invalid ||
        this.selectedCity.invalid || this.selectedAddress.invalid || this.selectedZipCode.invalid) {
      alert('Fill All Field !');
      return;
    }

    this.userService.updateUser(this.selectedTitle.value, this.selectedFirstName.value, this.selectedLastName.value,
      this.selectedCity.value, this.selectedAddress.value, this.selectedZipCode.value, this.sessionService.getSessionID()).
        subscribe(async value => {

    });


  }

  sendNotification() {
    this.subscriptionService.insertSubscription(this.sessionService.getSessionEmail()).subscribe(value => {

    });
  }
}
