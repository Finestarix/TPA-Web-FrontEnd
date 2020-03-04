import {Component, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from '../../../core/text-editor/text-editor.component';
import {BlogService} from '../../../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogData} from '../../../../models/blog-interface';
import {DialogErrorComponent} from '../../core/dialog-error/dialog-error.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-update-blog-admin',
  templateUrl: './update-blog-admin.component.html',
  styleUrls: ['./update-blog-admin.component.scss']
})
export class UpdateBlogAdminComponent implements OnInit {

  @ViewChild(TextEditorComponent, {static: true})
  private textEditor: TextEditorComponent;

  selectedCategory: string;
  selectedImage: string;
  selectedArg: string;
  selectedArg2: string;
  selectedID: number;

  constructor(private activatedRouter: ActivatedRoute,
              private blogService: BlogService,
              private dialogError: MatDialog,
              private router: Router) {
    this.activatedRouter.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  ngOnInit() {
  }

  updateBlog() {
    if (this.textEditor.getContent() === ''
      || this.selectedCategory === '' || this.selectedImage === '') {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    const blog: BlogData = {
      id: this.selectedID,
      category: this.selectedCategory,
      content: this.textEditor.getContent(),
      image: this.selectedImage,
      title: '',
      userID: 0,
      viewCount: 0,
    };

    this.blogService.updateBlog(blog).subscribe(async query => {
      await this.router.navigateByUrl('Admin/Home');
    });

  }

  getAllParameterData(params: any) {
    if (params.id === undefined) {
      this.router.navigateByUrl('/Admin/Home');
      return;
    }

    this.selectedID = params.id;
    this.selectedArg = params.title;
    this.selectedArg2 = params.content;
  }
}
