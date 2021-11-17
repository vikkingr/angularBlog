import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.UserCreated.subscribe((result) => {
      alert("Thanks for making an account!")
    })
  }

  CreateAccount() {
    this.userService.CreateUser(this.newUser).subscribe((result) => {
      this.userService.NavigateToLogin();
    }, (error) => {
      console.log(error);
    });
  }

}
