import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'sortTrain'
})
export class SortTrainPipe implements PipeTransform {

  sortByLowPrice(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortHotel;
  }

  sortByHighPrice(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return 1;
      } else if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortHotel;
  }

  shortestDuration(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
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

    return sortHotel;
  }

  typeAsc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
    return sortHotel;
  }

  typeDesc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return b.name.localeCompare(a.name);
    });
    return sortHotel;
  }

  classAsc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return a.class.localeCompare(b.class);
    });
    return sortHotel;
  }

  classDesc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return b.class.localeCompare(a.class);
    });
    return sortHotel;
  }

  transitAsc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return a.transit.name.localeCompare(b.transit.name);
    });
    return sortHotel;
  }

  transitDesc(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      return b.transit.name.localeCompare(a.transit.name);
    });
    return sortHotel;
  }

  transform(train: object[], sortBy: string): any {
    if (sortBy === 'lowestPrice') {
      train = this.sortByLowPrice(train);
    } else if (sortBy === 'highestPrice') {
      train = this.sortByHighPrice(train);
    } else if (sortBy === 'shortestDuration') {
      train = this.shortestDuration(train);
    } else if (sortBy === 'typeAsceding') {
      train = this.typeAsc(train);
    } else if (sortBy === 'typeDescending') {
      train = this.typeDesc(train);
    } else if (sortBy === 'classAscending') {
      train = this.classAsc(train);
    } else if (sortBy === 'classDescending') {
      train = this.classDesc(train);
    } else if (sortBy === 'transitAscending') {
      train = this.transitAsc(train);
    } else if (sortBy === 'transitDescending') {
      train = this.transitDesc(train);
    }

    return train;
  }

}
