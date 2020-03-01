import { Pipe, PipeTransform } from '@angular/core';
import {SearchTrain} from '../../helpers/search-train';

@Pipe({
  name: 'searchTrain',
  pure: false
})
export class SearchTrainPipe implements PipeTransform {

  transform(train: object[], args: object[]): any {
    // @ts-ignore
    return SearchTrain.search(train, args[0], args[1], args[2], args[3]);
  }

}
