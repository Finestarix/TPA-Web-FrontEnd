import {Component, OnDestroy, OnInit} from '@angular/core';
import {footerData, images, services} from './footer';
import {SubscriptionService} from "../../../services/subscription.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  services: object[];
  footerData: object[];
  images: object[];

  emailSubsciption$: Subscription;
  emailSubscription: string;

  constructor(private subscriptionService: SubscriptionService) {
    this.services = services;
    this.footerData = footerData;
    this.images = images;
  }

  ngOnInit() {
  }

  addSubscription() {
    this.emailSubsciption$ = this.subscriptionService.insertSubscription(this.emailSubscription).subscribe(async query => {
      await alert('Subscription Added !\n Please Check your Email !');
    });
    this.emailSubscription = '';
  }

  ngOnDestroy(): void {
    this.emailSubsciption$.unsubscribe();
  }

}
