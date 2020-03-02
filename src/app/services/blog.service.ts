import { Injectable } from '@angular/core';
import {BlogData} from '../models/blog-interface';
import {Apollo} from 'apollo-angular';
import {deleteBlog, getAllBlog, getBlogByID, insertBlog, updateBlog} from './queries/blogQuery';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private apollo: Apollo) { }

  insertNewBlog(blog: BlogData) {
    return this.apollo.mutate<any>( {
      mutation: insertBlog,
      variables: {
        userData: blog.userID,
        imageData: blog.image,
        categoryData: blog.category,
        titleData: blog.title,
        contentData: blog.content,
      }
    });
  }

  getBlogByID(id: number) {
    return this.apollo.query<any>({
      query: getBlogByID,
      variables: {
        idData: id,
      },
    });
  }

  getAllBlog() {
    return this.apollo.query<any>( {
      query: getAllBlog,
      fetchPolicy: 'no-cache',
    });
  }

  deleteBlog(id: number) {
    return this.apollo.mutate<any>({
      mutation: deleteBlog,
      variables: {
        idData: id,
      }
    });
  }

  updateBlog(blog: BlogData) {
    return this.apollo.mutate<any>( {
      mutation: updateBlog,
      variables: {
        idData: blog.id,
        imageData: blog.image,
        categoryData: blog.category,
        contentData: blog.content,
      }
    });
  }

}
