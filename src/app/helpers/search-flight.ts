import * as moment from 'moment';

export class SearchFlight {

  private static transit: boolean[];
  private static departureTime: boolean[];
  private static arrivalTime: boolean[];
  private static airlines: boolean[];
  private static facilities: boolean[];
  private static transitAirport: boolean[];
  private static flight: object[];

  private static uniqueValue(a, param) {
    return a.filter((item, pos, array) => {
      return array.map((mapItem) => {
        return mapItem[param];
      }).indexOf(item[param]) === pos;
    });
  }

  private static filterDuration(v1, vh1, v2, vh2): void {
    this.flight = this.flight.filter(h => {
      // @ts-ignore
      return h.transitDuration >= v2 && h.transitDuration <= vh2;
    });

    this.flight = this.flight.filter(h => {

      // @ts-ignore
      return moment.duration(moment(h.departureTime).diff(moment(h.arrivalTime))).asMinutes() >= v1 &&
        // @ts-ignore
        moment.duration(moment(h.departureTime).diff(moment(h.arrivalTime))).asMinutes() <= vh1;
    });
  }

  private static filterTransit(): void {
    let transit1: object[] = [];
    let transit2: object[] = [];

    if (this.transit[0]) {
      transit1 = this.flight.filter(c => {
        // @ts-ignore
        return c.transit.name === 'No Airport';
      });
    }

    if (this.transit[1]) {
      transit2 = this.flight.filter(c => {
        // @ts-ignore
        return c.transit.name !== 'No Airport';
      });
    }

    this.flight = [...transit1, ...transit2];
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  private static filterArrival(): void {
    let type1: object[] = [];
    let type2: object[] = [];
    let type3: object[] = [];
    let type4: object[] = [];

    if (this.arrivalTime[0]) {
      type1 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 0 && moment(c.arrivalTime).hour() < 6) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 0 && moment(c.departureTime).hour() < 6);
      });
    }

    if (this.arrivalTime[1]) {
      type2 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 6 && moment(c.arrivalTime).hour() < 12) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 6 && moment(c.departureTime).hour() < 12);
      });
    }

    if (this.arrivalTime[2]) {
      type3 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 12 && moment(c.arrivalTime).hour() < 18) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 12 && moment(c.departureTime).hour() < 18);
      });
    }

    if (this.arrivalTime[3]) {
      type4 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.arrivalTime).hour() > 18 && moment(c.arrivalTime).hour() < 24) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 18 && moment(c.departureTime).hour() < 24);
      });
    }

    console.log(type3);
    this.flight = [...type1, ...type2, ...type3, ...type4];
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  private static filterDeparture(): void {
    let type1: object[] = [];
    let type2: object[] = [];
    let type3: object[] = [];
    let type4: object[] = [];

    if (this.departureTime[0]) {
      type1 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.departureTime).hour() > 0 && moment(c.departureTime).hour() < 6) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 0 && moment(c.departureTime).hour() < 6);
      });
    }

    if (this.departureTime[1]) {
      type2 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.departureTime).hour() > 6 && moment(c.departureTime).hour() < 12) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 6 && moment(c.departureTime).hour() < 12);
      });
    }

    if (this.departureTime[2]) {
      type3 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.departureTime).hour() > 12 && moment(c.departureTime).hour() < 18) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 12 && moment(c.departureTime).hour() < 18);
      });
    }

    if (this.departureTime[3]) {
      type4 = this.flight.filter(c => {
        // @ts-ignore
        return (moment(c.departureTime).hour() > 18 && moment(c.departureTime).hour() < 24) ||
          // @ts-ignore
          (moment(c.departureTime).hour() > 18 && moment(c.departureTime).hour() < 24);
      });
    }


    this.flight = [...type1, ...type2, ...type3, ...type4];
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  private static filterAirline(): void {
    let airline1: object[] = [];
    let airline2: object[] = [];

    if (this.airlines[0]) {
      airline1 = this.flight.filter(c => {
        // @ts-ignore
        return c.company.name === 'Garuda Indonesia';
      });
    }

    if (this.airlines[1]) {
      airline2 = this.flight.filter(c => {
        // @ts-ignore
        return c.company.name === 'Lion Air';
      });
    }

    this.flight = [...airline1, ...airline2];
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  private static filterFacility(): void {
    let facility1: object[] = [];
    let facility2: object[] = [];
    let facility3: object[] = [];
    let facility4: object[] = [];

    if (this.facilities[0]) {
      facility1 = this.flight.filter(c => {
        // @ts-ignore
        return c.facility.name === 'Baggage';
      });
    }

    if (this.facilities[1]) {
      facility2 = this.flight.filter(c => {
        // @ts-ignore
        return c.facility.name === 'Entertainment';
      });
    }

    if (this.facilities[2]) {
      facility3 = this.flight.filter(c => {
        // @ts-ignore
        return c.facility.name === 'Meal';
      });
    }

    if (this.facilities[3]) {
      facility4 = this.flight.filter(c => {
        // @ts-ignore
        return c.facility.name === 'USB Port / Power';
      });
    }

    this.flight = [...facility1, ...facility2, ...facility3, ...facility4];
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  private static filterTransitAirport(dataType: object[]): void {
    const filteredFlight: object[] = [];

    for (let i = 0; i < this.transitAirport.length; i++) {

      if (this.transitAirport[i] === true) {
        for (const t of this.flight) {
          // @ts-ignore
          if (t.transit.name === dataType[i]) {
            filteredFlight.push(t);
          }
        }
      }
    }

    this.flight = filteredFlight;
    this.flight = this.uniqueValue(this.flight, 'id');
  }

  public static search(flight: object[], transitParam: boolean[], departureParam: boolean[], arrivalParam: boolean[],
                       facilityParam: boolean[], airlineParam: boolean[], transitAirport: boolean[],
                       v1: number, vh1: number, v2: number, vh2: number, data: object[]): object[] {

    if (flight === undefined) {
      return flight;
    }

    this.transit = transitParam;
    this.departureTime = departureParam;
    this.arrivalTime = arrivalParam;
    this.airlines = airlineParam;
    this.facilities = facilityParam;
    this.transitAirport = transitAirport;
    this.flight = flight;

    this.filterDuration(v1, vh1, v2, vh2);

    if (this.transit.includes(true)) {
      this.filterTransit();
    }
    if (this.departureTime.includes(true)) {
      this.filterDeparture();
    }
    if (this.arrivalTime.includes(true)) {
      this.filterArrival();
    }
    if (this.airlines.includes(true)) {
      this.filterAirline();
    }
    if (this.facilities.includes(true)) {
      this.filterFacility();
    }
    if (this.transitAirport.includes(true)) {
      this.filterTransitAirport(data);
    }

    return this.flight;

  }
}

