import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortHotel'
})
export class SortHotelPipe implements PipeTransform {

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

  sortByHighRating(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      if (a.rating < b.rating) {
        return 1;
      } else if (a.rating > b.rating) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortHotel;
  }

  sortByLowRating(sortHotel) {
    sortHotel.sort((a: any, b: any) => {
      if (a.rating < b.rating) {
        return -1;
      } else if (a.rating > b.rating) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortHotel;
  }

  transform(hotel: object[], sortBy: string): any[] {

    if (sortBy === 'Recommended') {
      return hotel;
    } else if (sortBy === 'High Price') {
      hotel = this.sortByHighPrice(hotel);
    } else if (sortBy === 'Low Price') {
      hotel = this.sortByLowPrice(hotel);
    } else if (sortBy === 'High Rating') {
      hotel = this.sortByHighRating(hotel);
    } else if (sortBy === 'Low Rating') {
      hotel = this.sortByLowRating(hotel);
    }

    return hotel;
  }
}
