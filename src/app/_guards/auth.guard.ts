import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { AuthService } from '../_services/auth.service';
// import { threadId } from 'worker_threads';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean  {
   if (this.authService.loggedIn()){
     return true;
   }

   alert('You shall not pass!');
   this.router.navigate(['/home']);
   return false;
  }
}
