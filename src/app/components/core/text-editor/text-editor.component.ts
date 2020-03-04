import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() textArg: string;

  @ViewChild('content', {static: true})
  public content: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  format(command) {
    document.execCommand(command, false);
  }

  getContent() {
    return this.content.nativeElement.innerHTML;
  }

}
