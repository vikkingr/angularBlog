import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId = '';
  password = '';
  badLoginError = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  Login() {
    // console.log(this.userId);
    // console.log(this.password);
    // if (!(this.authService.Login(this.userId, this.password)==true)) {
    //   this.badLoginError = true;
    // }
    
    this.authService.Login(this.userId, this.password).subscribe((response: any) => {
      this.authService.SetUserLoggedOn(JSON.stringify(response), this.userId);
    }, (err) => {
      this.badLoginError = true;
    });

  }

}
