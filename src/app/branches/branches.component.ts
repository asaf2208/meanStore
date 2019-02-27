import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  branches = [];
  searchTerm: string;

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/branches')
      .subscribe((data) => {
        this.branches = data['branches'];
      });
  }

  search() {
    this.http.get<any>('http://localhost:3000/branches/' + this.searchTerm)
      .subscribe((data) => {
        this.branches = data['branches'];
      });
  }

}
