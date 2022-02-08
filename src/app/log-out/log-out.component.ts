import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ConfirmService } from '../_services/confirm.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  model: any = {};
  modelProcess: any = {};

  constructor(
    public authService: AuthService, 
    private confirmService: ConfirmService,
    private router: Router) { }

  ngOnInit(): void {
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
    // this.confirmService.confirm();
    this.router.navigate(['/home']);
  }

}
