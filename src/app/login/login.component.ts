import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from '../_services/confirm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  modelProcess: any = {};
  constructor(
    public authService: AuthService, 
    private router: Router,
    private fB: FormBuilder,
    private confirmService: ConfirmService
    ) { }

  ngOnInit(): void {
 
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value

  }
  login(){
    console.log("ttttttttttttttttttttttttt", this.model)
  
    this.authService.login(this.model).subscribe(next => {
      this.modelProcess.UserId = this.authService.decodedToken?.nameid;
      this.modelProcess.Type = '1';
      this.modelProcess.Activity = ' ورود کاربر ' +  this.authService.decodedToken?.unique_name ;
      this.authService.processReg(this.modelProcess).subscribe(() => {
          }, error => {
            alert('This is error from Process Registration');
          }
          );
          // this.confirmService.confirm();
      alert('شما با موفقیت وارد سامانه شدید.');
    }, error => {
      alert('عدم موفقیت در ورود به سامانه');
    }, () => {
      this.router.navigate(['/resource']);
    });
  }

  loggedIn(){
    // return this.authService.loggedIn();
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
