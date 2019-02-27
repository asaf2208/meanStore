import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private globals: Globals,private router: Router,  private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  logout() {
    this.globals.logout();
    this.router.navigateByUrl("");
  }

}