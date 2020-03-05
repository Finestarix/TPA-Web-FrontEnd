import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogErrorComponent} from "../../../admin/core/dialog-error/dialog-error.component";
import {BlogData} from "../../../../models/blog-interface";
import {TextEditorComponent} from "../../../core/text-editor/text-editor.component";
import {ChatService} from "../../../../services/chat.service";
import {MatDialog} from "@angular/material/dialog";
import {BlogService} from "../../../../services/blog.service";

@Component({
  selector: 'app-insert-blog',
  templateUrl: './insert-blog.component.html',
  styleUrls: ['./insert-blog.component.scss']
})
export class InsertBlogComponent implements OnInit {

  @ViewChild(TextEditorComponent, {static: true}) textContent: any;


  selectedTitle: any;
  selectedContent: any;
  selectedCategory: any;
  selectedImage: any;

  constructor(private dialogError: MatDialog,
              private blogService: BlogService) { }

  ngOnInit() {
  }

  insertAction() {
    if (this.textContent.getContent() === '' || this.selectedCategory === '' ||
      this.selectedImage === '' || this.selectedTitle === '') {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    const blog: BlogData = {
      id: 0,
      category: this.selectedCategory,
      content: this.textContent.getContent(),
      // @ts-ignore
      image: this.selectedImage.files[0].name,
      title: this.selectedTitle,
      userID: 0,
      viewCount: 0,
    };

    this.blogService.insertNewBlog(blog).subscribe(async query => {
      await this.validateIndex(query);
    });

  }

  validateIndex(value) {
    if (value.data.InsertNewBlog === null) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Insert Failed !'
      });
    } else {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Insert Success !'
      });
    }
  }
}
