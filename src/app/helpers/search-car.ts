export class SearchCar {

  private static checkFilter: any;
  private static car: object[];

  private static checkEmpty = (searchText: string) => searchText === '';

  private static nothingChange() {
    return this.checkFilter[7] === 0;
  }

  private static uniqueValue(a, param) {
    return a.filter((item, pos, array) => {
      return array.map((mapItem) => {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    });
  }

  private static filterText(): void {
    if (!this.checkEmpty(this.checkFilter[0])) {
      this.checkFilter[0] = this.checkFilter[0].toLowerCase();
      const car1 = this.car.filter(c => {
        // @ts-ignore
        return c.carModel.brand.toLowerCase().includes(this.checkFilter[0]);
      });

      const car2 = this.car.filter(c => {
        // @ts-ignore
        return c.carModel.model.toLowerCase().includes(this.checkFilter[0]);
      });

      this.car = [...car1, ...car2];
      this.car = this.uniqueValue(this.car, 'id');
    }
  }

  private static filterPrice(): void {
    this.car = this.car.filter(c => {
      // @ts-ignore
      return c.price > this.checkFilter[1] && c.price < this.checkFilter[2];
    });
  }

  private static filterPassenger(): void {
    if (this.checkFilter[3].includes(true)) {

      if (this.checkFilter[3][0]) {
        return;
      }

      let car1: object[] = [];
      let car2: object[] = [];
      let car3: object[] = [];

      if (this.checkFilter[3][1]) {
        car1 = this.car.filter(c => {
          // @ts-ignore
          return c.carModel.passenger < 5;
        });
      }

      if (this.checkFilter[3][2]) {
        car2 = this.car.filter(c => {
          // @ts-ignore
          return c.carModel.passenger === 5 || c.carModel.pasenger === 6;
        });
      }

      if (this.checkFilter[3][3]) {
        car3 = this.car.filter(c => {
          // @ts-ignore
          return c.carModel.passenger > 5;
        });
      }

      this.car = [...car1, ...car2, ...car3];
      this.car = this.uniqueValue(this.car, 'id');
    }
  }

  private static filterModel(): void {

    if (this.checkFilter[5].includes(true)) {
      const filteredCar: object[] = [];

      for (let i = 0; i < this.checkFilter[4].length; i++) {

        if (this.checkFilter[5][i] === true) {
          for (const c of this.car) {
            // @ts-ignore
            if (c.carModel.model === this.checkFilter[4][i]) {
              filteredCar.push(c);
            }
          }
        }
      }
      this.car = filteredCar;
      this.car = this.uniqueValue(this.car, 'id');
    }
  }

  private static filterBrand(): void {

    if (this.checkFilter[7].includes(true)) {
      const filteredCar: object[] = [];

      for (let i = 0; i < this.checkFilter[6].length; i++) {

        if (this.checkFilter[7][i] === true) {
          for (const c of this.car) {
            // @ts-ignore
            if (c.carModel.brand === this.checkFilter[6][i]) {
              filteredCar.push(c);
            }
          }
        }
      }
      this.car = filteredCar;
      this.car = this.uniqueValue(this.car, 'id');
    }
  }

  private static resetAll(): void {
    this.checkFilter = null;
    this.car = [];
  }

  public static search(car: object[], checkFilter: any): object[] {

    this.resetAll();

    this.checkFilter = checkFilter;
    this.car = car;

    if (this.nothingChange()) {
      return this.car;
    }

    this.filterText();
    this.filterPrice();

    this.filterPassenger();
    this.filterBrand();
    this.filterModel();


    return this.car;

  }
}
