import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {insertSubscription} from './queries/subscriptionQuery';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private apollo: Apollo) {
  }

  insertSubscription(email: string): Observable<any> {

    const convertedEmail = String(email);

    return this.apollo.mutate<any>({
      mutation: insertSubscription,
      variables: {
        emailData: convertedEmail
      }
    });
  }

}
