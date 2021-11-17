import { Component, OnInit } from '@angular/core';
import { PostRequest } from '../models/PostRequest';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  newPost: PostRequest = new PostRequest();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  CreatePost() {
    this.postService.CreatePost(this.newPost).subscribe((result: any) => {
      this.postService.NavigateToHome();
    }, (error) => {
      console.log(error);
    });
  }

}
