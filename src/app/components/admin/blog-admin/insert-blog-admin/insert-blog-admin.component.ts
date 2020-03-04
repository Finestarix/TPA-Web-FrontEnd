import {Component, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from '../../../core/text-editor/text-editor.component';
import {FormControl} from '@angular/forms';
import {BlogData} from '../../../../models/blog-interface';
import {BlogService} from '../../../../services/blog.service';
import {Router} from '@angular/router';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-insert-blog-admin',
  templateUrl: './insert-blog-admin.component.html',
  styleUrls: ['./insert-blog-admin.component.scss']
})
export class InsertBlogAdminComponent implements OnInit {

  @ViewChild(TextEditorComponent, {static: true})
  private textEditor: TextEditorComponent;

  selectedCategory: string;
  selectedImage: string;
  selectedArg: string;

  constructor(private blogService: BlogService,
              private dialogError: MatDialog,
              private router: Router) {
    this.selectedArg = 'Insert';
  }

  ngOnInit() {
  }

  insertBlog() {

    if (
      this.textEditor.getContent() === ''
      || this.selectedCategory === '' || this.selectedImage === '') {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    const blog: BlogData = {
      id: 0,
      category: this.selectedCategory,
      content: this.textEditor.getContent(),
      image: this.selectedImage,
      title: '',
      userID: 0,
      viewCount: 0,
    };

    this.blogService.insertNewBlog(blog).subscribe(async query => {
      await this.router.navigateByUrl('Admin/Home');
    });

  }

}
