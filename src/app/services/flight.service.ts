import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  deleteFlight,
  getAllFlight,
  getAllFlightAirport,
  getAllFlightData,
  insertFlight,
  updateFlight
} from './queries/flightQuery';
import {FlightData} from "../models/flight-interface";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private apollo: Apollo) {
  }

  getAllFlight() {
    return this.apollo.query<any>({
      query: getAllFlight,
      fetchPolicy: 'no-cache',
    });
  }

  getAllFlightAirport() {
    return this.apollo.query<any>({
      query: getAllFlightAirport,
      fetchPolicy: 'no-cache',
    });
  }

  getFlightData(from: string, to: string, date: string) {

    return this.apollo.query<any>({
      query: getAllFlightData,
      variables: {
        fromData: from,
        toData: to,
        dateData: date,
      }
    });
  }

  insertFlight(flight: FlightData) {

    return this.apollo.mutate<any>({
      mutation: insertFlight,
      variables: {
        companyData: flight.companyName,
        durationData: flight.transitDuration,
        modelData: flight.model,
        priceData: flight.price,
        fromAirportData: flight.from,
        toAirportData: flight.to,
        transitAirportData: flight.transit,
        arrivalData: flight.arriveDate,
        departureData: flight.departDate,
      }
    });
  }

  updateFlight(flight: FlightData) {

    return this.apollo.mutate<any>({
      mutation: updateFlight,
      variables: {
        idData: flight.id,
        durationData: flight.transitDuration,
        modelData: flight.model,
        priceData: flight.price,
        fromAirportData: flight.from,
        toAirportData: flight.to,
        transitAirportData: flight.transit,
        arrivalData: flight.arriveDate,
        departureData: flight.departDate,
      }
    });
  }

  deleteFlight(id: number) {
    return this.apollo.mutate<any>({
      mutation: deleteFlight,
      variables: {
        idData: id
      }
    });
  }
}
