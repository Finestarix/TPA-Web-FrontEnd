import { Injectable } from '@angular/core';
import {
  deleteTrainByID,
  getAllTrain,
  getAllTrainStation, getTrainByLocation,
  insertTrain,
  updateTrain
} from './queries/trainQuery';
import {Apollo} from 'apollo-angular';
import {TrainData} from '../models/train-interface';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private apollo: Apollo) { }

  getAllTrain() {
    return this.apollo.query<any>({
      query: getAllTrain,
      fetchPolicy: 'no-cache',
    });
  }

  getAllTrainStation() {
    return this.apollo.query<any>({
      query: getAllTrainStation,
      fetchPolicy: 'no-cache',
    });
  }

  getTrainByLocation(arrival: string, departure: string, time: string) {

    console.log(arrival);
    console.log(departure);
    console.log(time);

    return this.apollo.query<any>({
      query: getTrainByLocation,
      variables: {
        arrivalData: arrival,
        departureData: departure,
        dateData: time,
      },
      fetchPolicy: 'no-cache',
    });
  }

  insertNewTrain(train: TrainData) {

    const nameCode = train.nameCode.split(',', 2);

    const nameConverted = String(nameCode[0]);
    const codeConverted = String(nameCode[1]);
    const classConverted = String(train.class);
    const seatConverted = train.seat;
    const priceConverted = train.price;
    const arrivalConverted = String(train.arrivalName);
    const arrivalTimeConverted = String(train.arrivalTime);
    const transitConverted = String(train.transit);
    const departureConverted = String(train.departureName);
    const departureTimeConverted = String(train.departureTime);

    return this.apollo.mutate<any>({
      mutation: insertTrain,
      variables: {
        nameData: nameConverted,
        codeData: codeConverted,
        classData: classConverted,
        seatData: seatConverted,
        priceData: priceConverted,
        arrivalData: arrivalConverted,
        arrivalTimeData: arrivalTimeConverted,
        transitData: transitConverted,
        departureData: departureConverted,
        departureTimeData: departureTimeConverted
      }
    });
  }

  updateTrain(train: TrainData) {
    const idConverted = train.id;
    const seatConverted = train.seat;
    const priceConverted = train.price;
    const arrivalTimeConverted = String(train.arrivalTime);
    const departureTimeConverted = String(train.departureTime);

    return this.apollo.mutate<any>({
      mutation: updateTrain,
      variables: {
        idData: idConverted,
        seatData: seatConverted,
        priceData: priceConverted,
        arrivalTimeData: arrivalTimeConverted,
        departureTimeData: departureTimeConverted
      }
    });
  }

  deleteTrainByID(id: any) {
    const convertedID = String(id);

    return this.apollo.mutate<any>({
      mutation: deleteTrainByID,
      variables: {
        idData: convertedID,
      }
    });
  }

}
