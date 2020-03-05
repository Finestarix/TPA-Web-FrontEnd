import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  messageControl = new FormControl();
  messageLists: Array<any> = [];
  imgSrc: string;

  constructor(private  chatService: ChatService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('id') === null){
      this.router.navigate(['/']);
    }

    this.chatService.listen('chat').subscribe(m => {
      this.messageLists.push(m);
    });
  }

  validate(message: string): boolean{
    const getsplit = message.split('|');
    return sessionStorage.getItem('id') + '' === getsplit[1];
  }

  sendMessage() {
    const sender = sessionStorage.getItem('id');
    this.chatService.emit('chat', this.messageControl.value + '|' + sender);
    this.messageControl.setValue('');
  }

  sendImage(){
    const sender = sessionStorage.getItem('id');
    this.chatService.emit('chat', this.imgSrc + '|' + sender);
    this.messageControl.setValue('');
  }

  onFileChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Invalid Format !');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imgSrc = reader.result;
    this.sendImage();
  }
}
