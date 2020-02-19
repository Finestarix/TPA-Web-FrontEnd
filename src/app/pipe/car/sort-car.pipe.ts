import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCar'
})
export class SortCarPipe implements PipeTransform {

  sortByHighPrice(sortCar) {
    sortCar.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return 1;
      } else if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortCar;
  }

  sortByLowPrice(sortCar) {
    sortCar.sort((a: any, b: any) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortCar;
  }

  transform(car: any, sortBy: string): any {
    if (sortBy === 'Recommended') {
      return car;
    } else if (sortBy === 'High Price') {
      car = this.sortByHighPrice(car);
    } else if (sortBy === 'Low Price') {
      car = this.sortByLowPrice(car);
    }

    return car;
  }

}
