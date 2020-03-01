import * as moment from "moment";

export class SearchTrain {

  private static class: boolean[];
  private static time: boolean[];
  private static type: boolean[];
  private static train: object[];

  private static uniqueValue(a, param) {
    return a.filter((item, pos, array) => {
      return array.map((mapItem) => {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    });
  }

  private static filterClass(): void {
    let class1: object[] = [];
    let class2: object[] = [];
    let class3: object[] = [];

    if (this.class[0]) {
      class1 = this.train.filter(c => {
        // @ts-ignore
        return c.class === 'Economy';
      });
    }

    if (this.class[1]) {
      class2 = this.train.filter(c => {
        // @ts-ignore
        return c.class === 'Business';
      });
    }

    if (this.class[2]) {
      class3 = this.train.filter(c => {
        // @ts-ignore
        return c.class === 'Executive';
      });
    }

    this.train = [...class1, ...class2, ...class3];
    this.train = this.uniqueValue(this.train, 'id');
  }

  private static filterTime(): void {
    let type1: object[] = [];
    let type2: object[] = [];
    let type3: object[] = [];
    let type4: object[] = [];

    if (this.time[0]) {
      type1 = this.train.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 0 && moment(c.arrivalTime).hour() < 6) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 0 && moment(c.departureTime).hour() < 6);
      });
    }

    if (this.time[1]) {
      type2 = this.train.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 6 && moment(c.arrivalTime).hour() < 12) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 6 && moment(c.departureTime).hour() < 12);
      });
    }

    if (this.time[2]) {
      type3 = this.train.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 12 && moment(c.arrivalTime).hour() < 18) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 12 && moment(c.departureTime).hour() < 18);
      });
    }

    if (this.time[3]) {
      type4 = this.train.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 18 && moment(c.arrivalTime).hour() < 24) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 18 && moment(c.departureTime).hour() < 24);
      });
    }


    this.train = [...type1, ...type2, ...type3, ...type4];
    this.train = this.uniqueValue(this.train, 'id');
  }


  private static filterType(dataType: object[]): void {
    const filteredTrain: object[] = [];

    for (let i = 0; i < this.type.length; i++) {

      if (this.type[i] === true) {
        for (const t of this.train) {
          // @ts-ignore
          if (t.name === dataType[i]) {
            filteredTrain.push(t);
          }
        }
      }
    }

    this.train = filteredTrain;
    this.train = this.uniqueValue(this.train, 'id');
  }

  public static search(train: object[], classParam: boolean[], timeParam: boolean[], typeParam: boolean[], dataType: object[]): object[] {
    this.class = classParam;
    this.time = timeParam;
    this.type = typeParam;
    this.train = train;

    if (this.class.includes(true)) {
      this.filterClass();
    }
    if (this.time.includes(true)) {
      this.filterTime();
    }
    if (this.type.includes(true)) {
      this.filterType(dataType);
    }

    return this.train;

  }
}

