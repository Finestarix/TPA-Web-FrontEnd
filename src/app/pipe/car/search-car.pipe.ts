import { Pipe, PipeTransform } from '@angular/core';
import {SearchCar} from '../../helpers/search-car';

@Pipe({
  name: 'searchCar',
  pure: false
})
export class SearchCarPipe implements PipeTransform {

  transform(car: object[], checkValue: any[]): any {
    return SearchCar.search(car, checkValue);
  }

}
