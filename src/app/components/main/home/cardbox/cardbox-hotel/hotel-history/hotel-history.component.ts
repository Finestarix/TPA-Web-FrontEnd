import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HistoryService} from '../../../../../../services/history.service';

@Component({
  selector: 'app-hotel-history',
  templateUrl: './hotel-history.component.html',
  styleUrls: ['./hotel-history.component.scss']
})
export class HotelHistoryComponent implements OnInit {

  @Output() sendToParent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private hotelHistoryService: HistoryService) { }

  historyHotelData: object[];

  ngOnInit() {
    this.historyHotelData = JSON.parse(this.hotelHistoryService.getSession());
    console.log(this.historyHotelData);
  }

  passData(event) {
    this.sendToParent.emit(event);
  }

}
