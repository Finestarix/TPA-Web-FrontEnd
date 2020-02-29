import { Injectable } from '@angular/core';
import {
  deleteTrainByID,
  getAllTrain,
  getAllTrainStation,
  insertClassTrain,
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

  insertNewTrain(train: TrainData) {

    const nameCode = train.nameCode.split(',', 2);

    const nameConverted = String(nameCode[0]);
    const codeConverted = String(nameCode[1]);
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

  insertNewTrainClass(id: number, name: string) {
    return this.apollo.mutate<any>({
      mutation: insertClassTrain,
      variables: {
        idData: id,
        nameData: String(name),
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
