import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss']
})
export class EntertainmentComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.listen('event').subscribe(m => {
      alert(m);
    });
  }

}
