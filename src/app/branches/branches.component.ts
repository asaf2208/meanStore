import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { Socket } from 'ngx-socket-io';
import { Globals } from '../globals';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branches = [];
  searchName: string;
  searchCity: string;
  searchStreet: string;

  constructor(private globals: Globals, private socket: Socket, private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog ) 
  {
      this.setSockets();
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/branches/')
      .subscribe((data) => {
        this.branches = data['branches'];
      });
  }

  search() {
    this.http.get<any>('http://localhost:3000/branches/search?' + (this.searchName ? 'name=' + this.searchName : 'name=') + (this.searchCity ? '&city=' + this.searchCity : '&city=') + (this.searchStreet ? '&street=' + this.searchStreet : '&street='))
      .subscribe((data) => {
        this.branches = data['branches'];
      });
  }

  addBranch() {
    let dialogRef = this.dialog.open(AddBranchComponent, {
      width: '1000px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        if(result.flag == true)
          {
          console.log(result);
          this.http.post<any>("http://localhost:3000/branches",{
              "name": result.value.name.value,
              "street": result.value.street.value,
              "city": result.value.city.value
          }).subscribe(response => {
            console.log(response);
            if(response && response.message === "Created branch successfully") {
              console.log(response['createdBranch']);
              this.branches.push(response['createdBranch']);
            }
          });           
          } else {
          }
      } else {
      }
      });
  }

  setSockets() {
    this.socket.on('deleteBranch',(branchID : any) => {
      for (let index = 0; index < this.branches.length; index++) {
        console.log(this.branches[index]);
        if(branchID == this.branches[index]._id) {
          this.branches.splice(index,1);
        }
      }
    });

    this.socket.on('editBranch',(result) => {
      for (let index = 0; index < this.branches.length; index++) {
        console.log(this.branches[index]);
        if(result.id == this.branches[index]._id) {
          this.branches[index] = {
            "name" : result.name,
            "street" : result.street,
            "city" : result.city
          };
        }
      }
    });
  }

}
