import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  messageControl = new FormControl();
  messageLists: Array<any> = [];

  constructor(private  chatService: ChatService) { }

  ngOnInit() {
    this.chatService.listen('chat').subscribe(m => {
      this.messageLists.push(m);
    });
  }

  sendMessage() {
    this.chatService.emit('chat', this.messageControl.value);
    this.messageControl.setValue("");
  }

}
