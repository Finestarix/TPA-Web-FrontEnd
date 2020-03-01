import {Time} from '@angular/common';

export interface TrainData {
  id: number;
  nameCode: string;
  class: string;
  arrivalTime: string;
  arrivalName: string;
  transit: string;
  departureTime: string;
  departureName: string;
  price: number;
  seat: number;
}
