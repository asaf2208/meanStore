import { Component, OnInit, Input } from '@angular/core';
import { EditBranchComponent } from './../branches/edit-branch/edit-branch.component';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Globals } from '../globals';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private globals: Globals, private http: HttpClient,public dialog: MatDialog) { }

  @Input() name : string;
  @Input() street : string;
  @Input() city : string;
  @Input() id : string;


  ngOnInit() {
  }

  editBranch() {
    let dialogRef = this.dialog.open(EditBranchComponent, {
      data: {
        name: this.name,
        // selectedOS : this.data[index].os,
        street : this.street,
        city : this.city,
      },
      width: '400px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        if(result.flag == true)
          {
            const path = "http://localhost:3000/branches/" + this.id;
            const body = [{
              "propName": "name", "value": result.value.name.value
            },{
              "propName": "street", "value": result.value.street.value
            },{
              "propName": "city", "value": result.value.city.value
            }];
          this.http.patch<any>(path,body).subscribe(response => {
            console.log(response);
            if(response && response.message === "Created branch successfully") {
              console.log(response['createdBranch']);
            }
          });           
          } else {
          }
      } else {
      }
      });
  
  }

  deleteBranch() {
    const path = "http://localhost:3000/branches/" + this.id;

    this.http.delete(path).subscribe(response => {
      console.log(response);
    });
  }

}
