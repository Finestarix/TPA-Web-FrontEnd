import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../../services/blog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  constructor(private blogService: BlogService,
              private router: Router) { }

  allBlogData: any;

  ngOnInit() {
    this.blogService.getAllBlog().subscribe(async value => {
      await this.getAllBlog(value);
    });
  }

  getAllBlog(value) {
    this.allBlogData = value.data.AllBlog;
  }

  goToDetail(blog: any) {
    this.router.navigate(['/Blog/Detail'], {
      queryParams: {
        id: blog.id,
      }
    });
  }
}
