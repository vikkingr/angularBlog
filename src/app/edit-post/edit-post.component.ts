import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostRequest } from '../models/PostRequest';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editedPost: PostRequest = new PostRequest();

  postId: number | undefined;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.postId = params.postId;
      this.editedPost.content = params.content;
      this.editedPost.headerImage = params.headerImage;
      this.editedPost.title = params.title;
    })
  }

  EditPost() {
    this.postService.EditPost(this.editedPost, this.postId!).subscribe((result: any) => {
      this.postService.NavigateToHome();
    }, (error) => {
      console.log(error);
    });
  }

}
