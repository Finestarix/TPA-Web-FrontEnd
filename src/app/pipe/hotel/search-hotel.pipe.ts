import {Pipe, PipeTransform} from '@angular/core';
import {element} from 'protractor';

@Pipe({
  name: 'searchHotel'
})
export class SearchHotelPipe implements PipeTransform {

  private checkFilter: any;
  private hotel: object[] = [];
  private hotel1: object[] = [];
  private hotel2: object[] = [];
  private hotel3: object[] = [];
  private hotel4: object[] = [];
  private hotel5: object[] = [];
  private hotel6: object[] = [];
  private hotel7: object[] = [];
  private hotel8: object[] = [];
  private hotel9: object[] = [];
  private hotel10: object[] = [];
  private hotel11: object[] = [];
  private hotel12: object[] = [];
  private hotel13: object[] = [];

  checkEmpty = (searchText: string) => searchText === '';
  allEmpty = () => !this.checkFilter[1] && !this.checkFilter[2] && !this.checkFilter[3] && !this.checkFilter[4] && !this.checkFilter[5] &&
    !this.checkFilter[8] && !this.checkFilter[9] && !this.checkFilter[10] && !this.checkFilter[11] && !this.checkFilter[12] &&
    !this.checkFilter[13] && !this.checkFilter[14] && !this.checkFilter[15];
  nothingChange = () => this.checkFilter[16] === 0;
  isStarOne = (currElement, index, array) => Math.ceil(currElement.rating) === 1;
  isStarTwo = (currElement, index, array) => Math.ceil(currElement.rating) === 2;
  isStarThree = (currElement, index, array) => Math.ceil(currElement.rating) === 3;
  isStarFour = (currElement, index, array) => Math.ceil(currElement.rating) === 4;
  isStarFive = (currElement, index, array) => Math.ceil(currElement.rating) === 5;
  is24HourFrontDesk = (currElement, index, array) => currElement.name === '24 Hour-Frontdesk';
  isAC = (currElement, index, array) => currElement.name === 'AC';
  isElevator = (currElement, index, array) => currElement.name === 'Elevator';
  isParking = (currElement, index, array) => currElement.name === 'Parking';
  isRestaurant = (currElement, index, array) => currElement.name === 'Restaurant';
  isSPA = (currElement, index, array) => currElement.name === 'SPA';
  isSwimmingPool = (currElement, index, array) => currElement.name === 'Swimming Pool';
  isWiFi = (currElement, index, array) => currElement.name === 'WiFi';

  uniqueValue(a, param) {
    return a.filter((item, pos, array) => {
      return array.map((mapItem) => {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    });
  }

  resetAll(): void {
    this.checkFilter = null;
    this.hotel = [];
    this.hotel1 = [];
    this.hotel2 = [];
    this.hotel3 = [];
    this.hotel4 = [];
    this.hotel5 = [];
    this.hotel6 = [];
    this.hotel7 = [];
    this.hotel8 = [];
    this.hotel9 = [];
    this.hotel10 = [];
    this.hotel11 = [];
    this.hotel12 = [];
    this.hotel13 = [];
  }

  filterText(): void {
    if (!this.checkEmpty(this.checkFilter)) {
      this.checkFilter[0] = this.checkFilter[0].toLowerCase();
      this.hotel = this.hotel.filter(h => {
        // @ts-ignore
        return h.name.toLowerCase().includes(this.checkFilter[0]);
      });
    }
  }

  filterPrice(): void {
    this.hotel = this.hotel.filter(h => {
      // @ts-ignore
      return h.price > this.checkFilter[6] && h.price < this.checkFilter[7];
    });
  }

  filterRating(): void {
    if (this.checkFilter[1]) {
      this.hotel1 = this.hotel.filter(this.isStarOne);
    }
    if (this.checkFilter[2]) {
      this.hotel2 = this.hotel.filter(this.isStarTwo);
    }
    if (this.checkFilter[3]) {
      this.hotel3 = this.hotel.filter(this.isStarThree);
    }
    if (this.checkFilter[4]) {
      this.hotel4 = this.hotel.filter(this.isStarFour);
    }
    if (this.checkFilter[5]) {
      this.hotel5 = this.hotel.filter(this.isStarFive);
    }
  }

  filterFacility(): void {
    if (this.checkFilter[8]) {
      // @ts-ignore
      this.hotel6 = this.hotel.filter(h => (h.facility.filter(this.is24HourFrontDesk).length !== 0) ? h : null);
    }
    if (this.checkFilter[9]) {
      // @ts-ignore
      this.hotel7 = this.hotel.filter(h => (h.facility.filter(this.isAC).length !== 0) ? h : null);
    }
    if (this.checkFilter[10]) {
      // @ts-ignore
      this.hotel8 = this.hotel.filter(h => (h.facility.filter(this.isElevator).length !== 0) ? h : null);
    }
    if (this.checkFilter[11]) {
      // @ts-ignore
      this.hotel9 = this.hotel.filter(h => (h.facility.filter(this.isParking).length !== 0) ? h : null);
    }
    if (this.checkFilter[12]) {
      // @ts-ignore
      this.hotel10 = this.hotel.filter(h => (h.facility.filter(this.isRestaurant).length !== 0) ? h : null);
    }
    if (this.checkFilter[13]) {
      // @ts-ignore
      this.hotel11 = this.hotel.filter(h => (h.facility.filter(this.isSPA).length !== 0) ? h : null);
    }
    if (this.checkFilter[14]) {
      // @ts-ignore
      this.hotel12 = this.hotel.filter(h => (h.facility.filter(this.isSwimmingPool).length !== 0) ? h : null);
    }
    if (this.checkFilter[15]) {
      // @ts-ignore
      this.hotel13 = this.hotel.filter(h => (h.facility.filter(this.isWiFi).length !== 0) ? h : null);
    }
  }

  filterResult(): object[] {
    let filteredHotel: object[] = [
      ...this.hotel1, ...this.hotel2, ...this.hotel3, ...this.hotel4, ...this.hotel5,
      ...this.hotel6, ...this.hotel7, ...this.hotel8, ...this.hotel9, ...this.hotel10,
      ...this.hotel11, ...this.hotel12, ...this.hotel13
    ];

    // @ts-ignore
    filteredHotel = filteredHotel.filter(fH => fH.length !== 0);
    filteredHotel = this.uniqueValue(filteredHotel, 'name');

    return filteredHotel;
  }

  transform(hotel: object[], checkFilter: any): object[] {

    this.resetAll();

    this.checkFilter = checkFilter;
    this.hotel = hotel;

    if (this.nothingChange()) {
      return hotel;
    }

    this.filterText();
    this.filterPrice();

    if (this.allEmpty()) {
      return this.hotel;
    }

    this.filterRating();
    this.filterFacility();

    return this.filterResult();
  }

}
