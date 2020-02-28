import {Component, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from "../../../core/text-editor/text-editor.component";

@Component({
  selector: 'app-insert-blog-admin',
  templateUrl: './insert-blog-admin.component.html',
  styleUrls: ['./insert-blog-admin.component.scss']
})
export class InsertBlogAdminComponent implements OnInit {

  @ViewChild(TextEditorComponent, {static: true})
  private textEditor: TextEditorComponent;

  constructor() { }

  ngOnInit() {
  }

  insertBlog() {
    console.log(this.textEditor.getTitle());
    console.log(this.textEditor.getContent());
  }

}
