import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {getOther, getPromo} from "./queries/promoQuery";
import {Apollo} from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private apollo: Apollo) { }

  public getPromo(id: number): Observable<any> {

    return this.apollo.query<any>({
      query: getPromo,
      variables: {
        idData: id
      }
    });

  }

  public getOther(id: number): Observable<any> {

    return this.apollo.query<any>({
      query: getOther,
      variables: {
        idData: id
      }
    });

  }
}
