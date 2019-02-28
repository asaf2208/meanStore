import { Component } from '@angular/core';
import { Globals } from './globals';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  check : any;

  constructor(private globals: Globals,private socket: Socket) {
    if(sessionStorage.getItem('user') !== null) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log(user);
      this.globals.setUser(user.id,user.userName,user.fullName,user.email,user.isAdmin);
    }
  }
}