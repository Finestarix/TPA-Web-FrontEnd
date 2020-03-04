import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {deleteEvent, getAllEvent, insertEvent, updateEvent} from './queries/eventQuery';
import {EventData} from '../models/event-interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apollo: Apollo) { }

  getAllEvent() {
    return this.apollo.query<any>({
      query: getAllEvent,
      fetchPolicy: 'no-cache'
    });
  }

  insertEvent(event: EventData) {
    return this.apollo.mutate<any>({
      mutation: insertEvent,
      variables: {
        categoryData: event.type,
        dateData: event.date,
        imageData: event.image,
        latitudeData: event.latitude,
        locationData: event.location,
        longitudeData: event.longitude,
        priceData: event.price,
        titleData: event.title,
        termConditionData: event.termCondition,
        descriptionData: event.description
      }
    });
  }

  updateEvent(event: EventData) {
    return this.apollo.mutate<any>({
      mutation: updateEvent,
      variables: {
        idData: event.id,
        categoryData: event.type,
        dateData: event.date,
        imageData: event.image,
        latitudeData: event.latitude,
        locationData: event.location,
        longitudeData: event.longitude,
        priceData: event.price,
        titleData: event.title,
        termConditionData: event.termCondition,
        descriptionData: event.description
      }
    });
  }

  deleteEvent(id: number) {
    return this.apollo.mutate<any>({
      mutation: deleteEvent,
      variables: {
        idData: id,
      }
    });
  }
}
