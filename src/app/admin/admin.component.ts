import { Globals } from './../globals';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TimesPipe } from './timesPipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cmsValue: number = null;

  constructor(private globals: Globals,private router: Router,private http: HttpClient, private route: ActivatedRoute) {
    console.log(this.globals.user);
    if(this.globals.getUser() == null || this.globals.getUser().isAdmin == false) {
      console.log('false');
      console.log(this.globals.getUser());
      console.log(this.globals.getUser().isAdmin);
      this.router.navigateByUrl('');
    } else {
      this.http.get<any>('http://localhost:3000/branches').subscribe(response => {
        if(response && response.branches && response.branches.length > 0) {
          console.log(response.branches[0]);
          const id = response.branches[0]._id;
          this.http.get<any>('http://localhost:3000/branches/postCounter/' + id).subscribe(newResponse => {
            console.log(newResponse);
            if(newResponse) {
              this.cmsValue = Number(newResponse.count);
            }
          });
        }
      });
    }
  }

  ngOnInit() {
  }

}
