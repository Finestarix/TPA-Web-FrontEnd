export class SearchHotel {

  private static checkFilter: any;
  private static hotel: object[] = [];
  private static rating1: object[] = [];
  private static rating2: object[] = [];
  private static rating3: object[] = [];
  private static rating4: object[] = [];
  private static rating5: object[] = [];
  private static facility1: object[] = [];
  private static facility2: object[] = [];
  private static facility3: object[] = [];
  private static facility4: object[] = [];
  private static facility5: object[] = [];
  private static facility6: object[] = [];
  private static facility7: object[] = [];
  private static facility8: object[] = [];

  private static checkEmpty = (searchText: string) => searchText === '';

  private static allEmpty() {
    return !this.checkFilter[1] && !this.checkFilter[2] && !this.checkFilter[3] &&
      !this.checkFilter[4] && !this.checkFilter[5] && !this.checkFilter[8] && !this.checkFilter[9] &&
      !this.checkFilter[10] && !this.checkFilter[11] && !this.checkFilter[12] &&
      !this.checkFilter[13] && !this.checkFilter[14] && !this.checkFilter[15] && !this.checkFilter[16].includes(true);
  }
  private static ratingEmpty() {
    return !this.checkFilter[1] && !this.checkFilter[2] && !this.checkFilter[3] &&
      !this.checkFilter[4] && !this.checkFilter[5];
  }
  private static facilityEmpty() {
    return !this.checkFilter[8] && !this.checkFilter[9] && !this.checkFilter[10] && !this.checkFilter[11] &&
      !this.checkFilter[12] && !this.checkFilter[13] && !this.checkFilter[14] && !this.checkFilter[15];
  }
  private static nothingChange() {
    return this.checkFilter[18] === 0;
  }
  private static isStarOne = (currElement, index, array) => Math.ceil(currElement.rating) === 1;
  private static isStarTwo = (currElement, index, array) => Math.ceil(currElement.rating) === 2;
  private static isStarThree = (currElement, index, array) => Math.ceil(currElement.rating) === 3;
  private static isStarFour = (currElement, index, array) => Math.ceil(currElement.rating) === 4;
  private static isStarFive = (currElement, index, array) => Math.ceil(currElement.rating) === 5;
  private static is24HourFrontDesk = (currElement, index, array) => currElement.name === '24 Hour-Frontdesk';
  private static isAC = (currElement, index, array) => currElement.name === 'AC';
  private static isElevator = (currElement, index, array) => currElement.name === 'Elevator';
  private static isParking = (currElement, index, array) => currElement.name === 'Parking';
  private static isRestaurant = (currElement, index, array) => currElement.name === 'Restaurant';
  private static isSPA = (currElement, index, array) => currElement.name === 'SPA';
  private static isSwimmingPool = (currElement, index, array) => currElement.name === 'Swimming Pool';
  private static isWiFi = (currElement, index, array) => currElement.name === 'WiFi';

  private static uniqueValue(a, param) {
    return a.filter((item, pos, array) => {
      return array.map((mapItem) => {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    });
  }

  private static filterText(): void {
    if (!this.checkEmpty(this.checkFilter)) {
      this.checkFilter[0] = this.checkFilter[0].toLowerCase();
      this.hotel = this.hotel.filter(h => {
        // @ts-ignore
        return h.name.toLowerCase().includes(this.checkFilter[0]);
      });
    }
  }

  private static filterPrice(): void {
    this.hotel = this.hotel.filter(h => {
      // @ts-ignore
      return h.price > this.checkFilter[6] && h.price < this.checkFilter[7];
    });
  }

  private static filterRating(): void {
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

  private static combineAfterRating(): object[] {

    let filteredHotel: object[] = [
      ...this.rating1, ...this.rating2, ...this.rating3, ...this.rating4, ...this.rating5,
    ];

    // @ts-ignore
    filteredHotel = filteredHotel.filter(fH => fH.length !== 0);
    filteredHotel = this.uniqueValue(filteredHotel, 'name');

    return filteredHotel;
  }

  private static filterFacility(): void {
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
  }

  private static combineAfterFacility(): object[] {
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

  private static filterArea(): object[] {
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

  private static resetAll(): void {
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

  public static search(hotel: object[], checkFilter: any): object[] {

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

    if (!this.ratingEmpty()) {
      this.filterRating();
      this.hotel = this.combineAfterRating();
    }

    if (!this.facilityEmpty()) {
      this.filterFacility();
      this.hotel = this.combineAfterFacility();
    }

    if (checkFilter[16].includes(true)) {
      this.hotel = this.filterArea();
    }

    return this.hotel;
  }

}
