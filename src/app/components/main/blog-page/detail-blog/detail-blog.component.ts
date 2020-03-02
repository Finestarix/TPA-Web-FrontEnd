import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../../../services/blog.service";

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private blogService: BlogService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });
  }

  blogData: any;

  ngOnInit() {
  }

  getAllParameterData(params) {
    this.blogService.getBlogByID(params.id).subscribe(async value => {
      await this.getBlogData(value);
    });
  }

  getBlogData(value) {
    this.blogData = value.data.BlogByID;
  }

  facebook() {
    window.open('http://www.facebook.com/sharer.php?u=localhost:4200/Blog/Detail?id=' + this.blogData.id, 'facebookShare', 'width=626,height=436');
  }

  whatsapp() {
    window.open('https://api.whatsapp.com/send?text=localhost:4200/Blog/Detail?id=' + this.blogData.id)
  }

  copy() {
    navigator.clipboard.writeText('localhost:4200/Blog/Detail?id=' + this.blogData.id);
  }

  line() {
    window.open('http://line.me/R/msg/text/?Blog/Detail?id=' + this.blogData.id);
  }
}
