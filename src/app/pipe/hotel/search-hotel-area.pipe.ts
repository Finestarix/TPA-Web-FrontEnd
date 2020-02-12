import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchHotelArea',
  pure: false
})
export class SearchHotelAreaPipe implements PipeTransform {

  transform(hotel: object[], checkArea: any[]): any {

    if (checkArea[2] === 0) {
      return hotel;
    }

    const filteredHotel: object[] = [];

    for (let i = 0; i < checkArea[1].length; i++) {

      if (checkArea[0][i] === true) {
        for (const h of hotel) {
          // @ts-ignore
          if (h.location.city === checkArea[1][i].city) {
            filteredHotel.push(h);
          }
        }
      }

    }


    return filteredHotel;


  }

}
