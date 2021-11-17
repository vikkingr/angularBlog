import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output () UserCreated = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  CreateUser(newUser: User) {
    return this.http.post(`${environment.baseAPIURL}/Users`, newUser);
  }

  NavigateToLogin() {
    this.UserCreated.emit(true);
    this.router.navigate(['/Login']);
  }

}
