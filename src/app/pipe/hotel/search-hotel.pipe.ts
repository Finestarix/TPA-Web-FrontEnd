import {Pipe, PipeTransform} from '@angular/core';
import {SearchHotel} from '../../helpers/search-hotel';

@Pipe({
  name: 'searchHotel',
  pure: true
})
export class SearchHotelPipe implements PipeTransform {

  transform(hotel: object[], checkFilter: any): object[] {
    return SearchHotel.search(hotel, checkFilter);
  }

}
