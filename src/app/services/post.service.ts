import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostRequest } from '../models/PostRequest';
import { PostResponse } from '../models/PostResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  @Output () PostCreated = new EventEmitter<boolean>();
  @Output () PostDeleted = new EventEmitter<boolean>();
  @Output () PostEdited = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  // AddPostToArray(postResponse: PostResponse) {
  //   this.postsArr.push(postResponse);
  // }

  CreatePost(postRequest: PostRequest) {

    //let header = {'Authorization': `Bearer ${this.authService.GetCurrentUserToken()}`};

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authService.GetCurrentUserToken()}`);
    
    return this.http.post(`${environment.baseAPIURL}/Posts`, postRequest, {'headers': headers});

  }

  DeletePost(postId: number) {

    if (!confirm("...are you sure?")) {
      return;
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authService.GetCurrentUserToken()}`);

    return this.http.delete(`${environment.baseAPIURL}/Posts/${postId}`, {'headers': headers});

    // console.log(this.postsArr);
    // let thePost = this.postsArr.find(post => post.postId == postId);
    // console.log(thePost);
    // this.postsArr.splice(this.postsArr.indexOf(thePost!), 1);
    
  }

  Deleted() {

    this.PostDeleted.emit(true);
    this.router.navigate(['/']);
  
  }

  EditPost(editedPost: PostRequest, postId: number) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authService.GetCurrentUserToken()}`);
    
    return this.http.patch(`${environment.baseAPIURL}/Posts/${postId}`, editedPost, {'headers': headers});

  
  }

  Edited() {
  
    this.PostEdited.emit(true);
    this.router.navigate(['/']);
  
  }

  GetPosts() {
  
    return this.http.get(`${environment.baseAPIURL}/Posts`);
  
  }

  NavigateToHome() {
  
    this.PostCreated.emit(true);
    this.router.navigate(['/']);
  
  }
  

}
