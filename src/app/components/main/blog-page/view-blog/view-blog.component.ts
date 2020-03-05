import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../../services/blog.service";
import {Router} from "@angular/router";
import {ChatService} from "../../../../services/chat.service";

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  constructor(private blogService: BlogService,
              private chatService: ChatService,
              private router: Router) { }

  allBlogData: any;

  ngOnInit() {
    this.blogService.getAllBlog().subscribe(async value => {
      await this.getAllBlog(value);
    });

    this.chatService.listen('blog').subscribe(m => {
      alert(m);
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
