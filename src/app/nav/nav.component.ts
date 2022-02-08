import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  modelProcess: any = {};
  constructor(public authService: AuthService,  private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.modelProcess.UserId = this.authService.decodedToken?.nameid;
      this.modelProcess.Type = '1';
      this.modelProcess.Activity = ' ورود کاربر ' +  this.authService.decodedToken?.unique_name ;
      this.authService.processReg(this.modelProcess).subscribe(() => {
          }, error => {
           alert('This is error from Process Registration');
          }
          );
      alert('شما با موفقیت وارد سامانه شدید.');
    }, error => {
     alert('عدم موفقیت در ورود به سامانه');
    }, () => {
      this.router.navigate(['/screenplay']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.modelProcess.UserId = this.authService.decodedToken?.nameid;
    this.modelProcess.Type = '2';
    this.modelProcess.Activity = ' خروج کاربر ' +  this.authService.decodedToken?.unique_name ;
    this.authService.processReg(this.modelProcess).subscribe(() => {
        }, error => {
         alert('This is error from Process Registration');
        }
        );
    alert('logout...');
    this.router.navigate(['/home']);
  }

}
