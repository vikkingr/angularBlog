import { Component, OnInit } from '@angular/core';
import { PostRequest } from '../models/PostRequest'; 
import { PostResponse } from '../models/PostResponse'
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  postsArr: PostResponse[] = []

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.GetPosts().subscribe((response:any) => {
      this.postsArr = response;
      console.log(response)
    }, (error) => {
      console.log(error);
    });
  }

  DeletePost(postId: number) {
    this.postService.DeletePost(postId)?.subscribe((response: any) => {
      console.log(response);
      this.postService.GetPosts().subscribe((response:any) => {
        this.postsArr = response;
        console.log(response)
      }, (error) => {
        console.log(error);
      });
      this.postService.Deleted();
    }, (error) => {
      console.log(error);
    });
  }

}
