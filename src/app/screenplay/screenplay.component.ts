import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-screenplay',
  templateUrl: './screenplay.component.html',
  styleUrls: ['./screenplay.component.css'],
  // template: `<ul>
  // <!-- checked state. -->
  // <li><ejs-checkbox label="Checked State" [checked]="true"></ejs-checkbox></li>

  // <!-- unchecked state. -->
  // <li><ejs-checkbox label="Unchecked State"></ejs-checkbox></li>

  // <!-- indeterminate state. -->
  // <li><ejs-checkbox label="Indeterminate State" [indeterminate]="true"></ejs-checkbox></li>
  // </ul>`
})
export class ScreenplayComponent implements OnInit {
  registerMode = true;
  values: any;
  users: User[] | undefined;

  selectedDay: any = '';

  public data: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Gymnastics', 'Hockey', 'Rugby', 'Snooker', 'Tennis'];


  // event handler for the select element's change event
  selectChangeHandler(event: any) {
    this.selectedDay = event.target.value;
    alert(this.selectedDay);
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      alert('This is from member');
    }
    );
  }


  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }

}
