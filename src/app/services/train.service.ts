import { Injectable } from '@angular/core';
import {deleteTrainByID, getAllTrain} from './queries/trainQuery';
import {Apollo} from 'apollo-angular';

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

  insertNewTrain() {

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
