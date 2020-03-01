import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sortFlight'
})
export class SortFlightPipe implements PipeTransform {

  sortByLowPrice(sortPlane) {
    sortPlane.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortPlane;
  }

  sortByHighPrice(sortPlane) {
    sortPlane.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return 1;
      } else if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortPlane;
  }

  shortestDuration(sortPlane) {
    sortPlane.sort((a: any, b: any) => {
      if (moment.duration(moment(a.departureTime).
        diff(moment(a.arrivalTime))).asMinutes() <
        moment.duration(moment(b.departureTime).
        diff(moment(b.arrivalTime))).asMinutes()) {
        return -1;
      } else if (moment.duration(moment(a.departureTime).
        diff(moment(a.arrivalTime))).asMinutes() >
        moment.duration(moment(b.departureTime).
        diff(moment(b.arrivalTime))).asMinutes()) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortPlane;
  }

  transform(flight: object[], sortBy: string): any {
    if (sortBy === 'lowestPrice') {
      flight = this.sortByLowPrice(flight);
    } else if (sortBy === 'highestPrice') {
      flight = this.sortByHighPrice(flight);
    } else if (sortBy === 'shortestDuration') {
      flight = this.shortestDuration(flight);
    }

    return flight;
  }

}
