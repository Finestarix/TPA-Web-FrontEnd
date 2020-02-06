import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hotel-room',
  templateUrl: './hotel-room.component.html',
  styleUrls: ['./hotel-room.component.scss']
})
export class HotelRoomComponent implements OnInit {

  @Output() valueRoom = new EventEmitter();
  @Output() valueGuess = new EventEmitter();

  totalGuess: number;
  totalRoom: number;

  constructor() {
    this.totalGuess = this.totalRoom = 0;
  }

  ngOnInit() {
  }

  sendRoom(event) {
    this.totalRoom = event.value;
    this.valueRoom.emit(this.totalRoom);
  }

  sendGuess(event) {
    this.totalGuess = event.value;
    this.valueGuess.emit(this.totalGuess);
  }
}
