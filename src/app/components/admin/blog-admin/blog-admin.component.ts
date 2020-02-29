import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {HotelData} from '../../../models/hotel-interface';
import {MatTableDataSource} from '@angular/material/table';
import {HotelService} from '../../../services/hotel.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BlogService} from '../../../services/blog.service';
import {BlogData} from "../../../models/blog-interface";
import {Router} from "@angular/router";
import {DialogConfirmationComponent} from "../core/dialog-confirmation/dialog-confirmation.component";
import * as moment from "moment";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit, AfterViewInit {

  constructor(private blogService: BlogService,
              private router: Router,
              private dialogConfirm: MatDialog,
              private dialogError: MatDialog) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataBlog$: Subscription;
  dataBlog: any;
  dataBlogArr: BlogData[] = [];

  dataHotelDelete$: Subscription;

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;

  allColumns = ['image', 'title', 'category', 'content', 'update', 'delete'];
  dataSource = new MatTableDataSource();

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  updateAction(blog: BlogData) {
    this.router.navigate(['/Admin/UpdateBlog'], {
      queryParams: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
      }
    });
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
    this.router.navigate(['/Admin/InsertBlog']);
  }
}
