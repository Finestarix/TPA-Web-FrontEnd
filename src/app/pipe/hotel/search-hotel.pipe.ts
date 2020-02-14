import {Pipe, PipeTransform} from '@angular/core';
import {element} from 'protractor';

@Pipe({
  name: 'searchHotel',
  pure: true
})
export class SearchHotelPipe implements PipeTransform {

  private checkFilter: any;
  private hotel: object[] = [];
  private rating1: object[] = [];
  private rating2: object[] = [];
  private rating3: object[] = [];
  private rating4: object[] = [];
  private rating5: object[] = [];
  private facility1: object[] = [];
  private facility2: object[] = [];
  private facility3: object[] = [];
  private facility4: object[] = [];
  private facility5: object[] = [];
  private facility6: object[] = [];
  private facility7: object[] = [];
  private facility8: object[] = [];

  checkEmpty = (searchText: string) => searchText === '';
  allEmpty = () => !this.checkFilter[1] && !this.checkFilter[2] && !this.checkFilter[3] && !this.checkFilter[4] && !this.checkFilter[5] &&
    !this.checkFilter[8] && !this.checkFilter[9] && !this.checkFilter[10] && !this.checkFilter[11] && !this.checkFilter[12] &&
    !this.checkFilter[13] && !this.checkFilter[14] && !this.checkFilter[15] && !this.checkFilter[16].includes(true);
  ratingEmpty = () => !this.checkFilter[1] && !this.checkFilter[2] && !this.checkFilter[3] && !this.checkFilter[4] && !this.checkFilter[5];
  facilityEmpty = () => !this.checkFilter[8] && !this.checkFilter[9] && !this.checkFilter[10] && !this.checkFilter[11] && !this.checkFilter[12] &&
    !this.checkFilter[13] && !this.checkFilter[14] && !this.checkFilter[15];
  nothingChange = () => this.checkFilter[18] === 0;
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
    this.rating1 = [];
    this.rating2 = [];
    this.rating3 = [];
    this.rating4 = [];
    this.rating5 = [];
    this.facility1 = [];
    this.facility2 = [];
    this.facility3 = [];
    this.facility4 = [];
    this.facility5 = [];
    this.facility6 = [];
    this.facility7 = [];
    this.facility8 = [];
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
      this.rating1 = this.hotel.filter(this.isStarOne);
    }
    if (this.checkFilter[2]) {
      this.rating2 = this.hotel.filter(this.isStarTwo);
    }
    if (this.checkFilter[3]) {
      this.rating3 = this.hotel.filter(this.isStarThree);
    }
    if (this.checkFilter[4]) {
      this.rating4 = this.hotel.filter(this.isStarFour);
    }
    if (this.checkFilter[5]) {
      this.rating5 = this.hotel.filter(this.isStarFive);
    }
  }

  combineAfterRating(): object[] {

    let filteredHotel: object[] = [
      ...this.rating1, ...this.rating2, ...this.rating3, ...this.rating4, ...this.rating5,
    ];

    // @ts-ignore
    filteredHotel = filteredHotel.filter(fH => fH.length !== 0);
    filteredHotel = this.uniqueValue(filteredHotel, 'name');

    return filteredHotel;
  }

  filterFacility(): void {
    if (this.checkFilter[8]) {
      // @ts-ignore
      this.facility1 = this.hotel.filter(h => (h.facility.filter(this.is24HourFrontDesk).length !== 0) ? h : null);
    }
    if (this.checkFilter[9]) {
      // @ts-ignore
      this.facility2 = this.hotel.filter(h => (h.facility.filter(this.isAC).length !== 0) ? h : null);
    }
    if (this.checkFilter[10]) {
      // @ts-ignore
      this.facility3 = this.hotel.filter(h => (h.facility.filter(this.isElevator).length !== 0) ? h : null);
    }
    if (this.checkFilter[11]) {
      // @ts-ignore
      this.facility4 = this.hotel.filter(h => (h.facility.filter(this.isParking).length !== 0) ? h : null);
    }
    if (this.checkFilter[12]) {
      // @ts-ignore
      this.facility5 = this.hotel.filter(h => (h.facility.filter(this.isRestaurant).length !== 0) ? h : null);
    }
    if (this.checkFilter[13]) {
      // @ts-ignore
      this.facility6 = this.hotel.filter(h => (h.facility.filter(this.isSPA).length !== 0) ? h : null);
    }
    if (this.checkFilter[14]) {
      // @ts-ignore
      this.facility7 = this.hotel.filter(h => (h.facility.filter(this.isSwimmingPool).length !== 0) ? h : null);
    }
    if (this.checkFilter[15]) {
      // @ts-ignore
      this.facility8 = this.hotel.filter(h => (h.facility.filter(this.isWiFi).length !== 0) ? h : null);
    }

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.table(this.facility1);
    console.table(this.facility2);
    console.table(this.facility3);
    console.table(this.facility4);
    console.table(this.facility5);
    console.table(this.facility6);
    console.table(this.facility7);
    console.table(this.facility8);
  }

  combineAfterFacility(): object[] {
    let filteredHotel: object[] = [
      ...this.facility1, ...this.facility2, ...this.facility3,
      ...this.facility4, ...this.facility5, ...this.facility6,
      ...this.facility7, ...this.facility8
    ];

    // @ts-ignore
    filteredHotel = filteredHotel.filter(fH => fH.length !== 0);
    filteredHotel = this.uniqueValue(filteredHotel, 'name');

    return filteredHotel;
  }

  filterArea(): object[] {
    const filteredHotel: object[] = [];

    for (let i = 0; i < this.checkFilter[16].length; i++) {

      if (this.checkFilter[16][i] === true) {
        for (const h of this.hotel) {
          // @ts-ignore
          if (h.location.city === this.checkFilter[17][i].city) {
            filteredHotel.push(h);
          }
        }
      }

    }

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

    console.log(this.checkFilter[16])
    console.log(this.checkFilter[17])

    if (this.allEmpty()) {
      return this.hotel;
    }
    console.log('A');

    // console.table(this.hotel);
    if (!this.ratingEmpty()) {
      this.filterRating();
      this.hotel = this.combineAfterRating();
    }

    if (!this.facilityEmpty()) {
      this.filterFacility();
      this.hotel = this.combineAfterFacility();
    }

    console.log('Before');
    console.table(this.hotel);
    if (checkFilter[16].includes(true)) {
      this.hotel = this.filterArea();
    }

    console.log('After');
    console.table(this.hotel);

    return this.hotel;
  }

}
