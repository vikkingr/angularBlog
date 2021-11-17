import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: string | null = null;

  constructor(private postService: PostService, private authService: AuthService) { 
    this.currentUser = this.authService.GetCurrentUser();
  }

  ngOnInit(): void {
    this.postService.PostCreated.subscribe((result) => {
      alert('Posted!')
    });
    this.authService.UserLoginChanged.subscribe((result) => {
      this.currentUser = this.authService.GetCurrentUser();
    });
  }

  Logout() {
    this.authService.LogOut();
  }

}
