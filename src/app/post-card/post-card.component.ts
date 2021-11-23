import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostResponse } from '../models/PostResponse';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input () currentPost: PostResponse | null = null;
  @Output () PostDeleted = new EventEmitter<number>();
  @Output () PostEdited = new EventEmitter<number>();

  userId: string = '';

  constructor(private authService: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    
    let possibleUserId = this.authService.GetCurrentUser();

    if (possibleUserId != null) {
      this.userId = possibleUserId;
    }

  }

  DeletePost() {
    this.PostDeleted.emit(this.currentPost?.postId);
  }

  EditPost() {
    this.PostEdited.emit(this.currentPost?.postId);
    this.router.navigate(['/EditPost', {
        postId: this.currentPost?.postId,
        title: this.currentPost?.title,
        content: this.currentPost?.content,
        headerImage: this.currentPost?.headerImage
      }]);
  }

}
