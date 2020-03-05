import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BlogService} from '../../../services/blog.service';
import {BlogData} from "../../../models/blog-interface";
import {Router} from "@angular/router";
import {DialogConfirmationComponent} from "../core/dialog-confirmation/dialog-confirmation.component";
import {DialogErrorComponent} from '../core/dialog-error/dialog-error.component';
import {TextEditorComponent} from '../../core/text-editor/text-editor.component';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit, AfterViewInit {

  constructor(private blogService: BlogService,
              private router: Router,
              private chatService: ChatService,
              private dialogConfirm: MatDialog,
              private dialogError: MatDialog) {
    this.selectedContent = '';
    this.selectedTitle = '';
    this.selectedImage = '';
    this.selectedCategory = '';

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(TextEditorComponent, {static: true}) textContent: any;

  dataBlog$: Subscription;
  dataBlog: any;
  dataBlogArr: BlogData[] = [];

  dataHotelDelete$: Subscription;

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;

  allColumns = ['image', 'title', 'category', 'content', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  selectedID: number;
  selectedTitle: string;
  selectedContent: string;
  selectedCategory: string;
  selectedImage: string;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getBlogData();
  }

  setDataSource(blogs: object[]) {
    this.dataSource = new MatTableDataSource(blogs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBlogData() {
    this.dataBlogArr = [];
    this.dataBlog$ = this.blogService.getAllBlog().subscribe(async query => {
      await this.fetchBlogData(query);
    });
  }

  fetchBlogData(query) {
    this.dataBlog = query.data.AllBlog;

    for (const blog of this.dataBlog) {
      this.dataBlogArr.push(this.createNewBlog(blog));
    }

    this.setDataSource(this.dataBlogArr);
    this.dataBlog$.unsubscribe();
  }

  createNewBlog(blog: any): BlogData {

    return {
      content: blog.content,
      title: blog.title,
      category: blog.category,
      userID: blog.userID,
      image: blog.image,
      viewCount: blog.viewCount,
      id: blog.id
    };
  }

  applyFilter(filterValue: any) {
    // @ts-ignore
    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  setAction(blog: any) {
    this.selectedID = blog.id;
    this.selectedCategory = blog.category;
    this.selectedTitle = blog.title;
    this.selectedImage = blog.image;
    this.selectedContent = blog.content;
  }

  updateAction() {
    if (this.textContent.getContent() === '' || this.selectedCategory === '' ||
      this.selectedImage === '' || this.selectedTitle === '') {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Fill All Field !'
      });
      return;
    }

    const blog: BlogData = {
      id: this.selectedID,
      category: this.selectedCategory,
      content: this.textContent.getContent(),
      // @ts-ignore
      image: this.selectedImage.files[0].name,
      title: this.selectedTitle,
      userID: 0,
      viewCount: 0,
    };

    this.blogService.updateBlog(blog).subscribe(async query => {
      await this.getBlogData();
    });

    this.getBlogData();
  }

  deleteAction(blog: BlogData) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.dataHotelDelete$ = this.blogService.deleteBlog(blog.id).subscribe(async query => {
          await this.getBlogData();
        });
      } else {
        return;
      }
    });
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
      await this.validateData(query);
    });

    this.chatService.emit('blog', 'New Blog Inserted !');


  }

  validateData(value) {
    if (value.data.InsertNewBlog === null) {
      this.dialogError.open(DialogErrorComponent, {
        data: 'Insert Failed !'
      });
    } else {
      this.getBlogData();
    }
  }

}
