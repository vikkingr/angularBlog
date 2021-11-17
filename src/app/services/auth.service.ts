import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() UserLoginChanged = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  Login(userId: string, password: string) {

    return this.http.get(`${environment.baseAPIURL}/Users/${userId}/${password}`);

  }

  SetUserLoggedOn(token: string, userId: string) {

    localStorage.setItem('blogUserId', userId);
    localStorage.setItem('blogUserToken', token);
    this.UserLoginChanged.emit(true);
    this.router.navigate(['/']);

  }

  LogOut() {

    localStorage.removeItem('blogUserId');
    localStorage.removeItem('blogUserToken');
    this.UserLoginChanged.emit(false);
    this.router.navigate(['/Login']);

  }

  GetCurrentUser() {

    return localStorage.getItem('blogUserId');

  }

  GetCurrentUserToken() {

    return localStorage.getItem('blogUserToken');

  }

}
