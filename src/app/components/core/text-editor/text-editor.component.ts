import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() conditional: string;
  @Input() conditional2: string;

  @ViewChild('title', {static: true})
  private title: ElementRef;
  @ViewChild('content', {static: true})
  private content: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  format(command) {
    document.execCommand(command, false);
  }

  getTitle() {
    return this.title.nativeElement.innerHTML;
  }

  getContent() {
    return this.content.nativeElement.innerHTML;
  }

}
