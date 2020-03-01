import { Pipe, PipeTransform } from '@angular/core';
import {SearchFlight} from "../../helpers/search-flight";

@Pipe({
  name: 'searchFlight',
  pure: false
})
export class SearchFlightPipe implements PipeTransform {

  transform(flight: object[], obj: object[]): any {
    // @ts-ignore
    return SearchFlight.search(flight, obj[0], obj[1], obj[2], obj[3], obj[4], obj[5], obj[6], obj[7], obj[8], obj[9], obj[10]);
  }


}
