import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: any;
  readonly uri: string = 'ws://localhost:4202';

  constructor() {
    this.socket = io(this.uri);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  getUserData(item: string) {

  }

  getAllChat() {
  }

  insertChat(userId: number, num: number, s: string) {

  }
}
