import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RguardService implements CanActivate {

  constructor(private router:Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    let loggedInUserToken = this.authService.GetCurrentUserToken();

    if(!loggedInUserToken) {
      this.router.navigate(['/Login']);
      return false;
    }

    let loggedInUser = this.authService.GetCurrentUser();
    let token: any = jwtDecode(loggedInUserToken!);
    
    if (loggedInUser != token.userId) {
      this.router.navigate(['/Login'])
      return false;
    }
    return true;

  }
  
}
