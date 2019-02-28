import { EditProductComponent } from './../products/edit-product/edit-product.component';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  @Input() name : string;
  @Input() price : string;
  @Input() category : string;
  @Input() id : string;


  ngOnInit() {
  }

  editProduct() {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        name: this.name,
        // selectedOS : this.data[index].os,
        price : this.price,
        category : this.category,
      },
      width: '400px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        if(result.flag == true)
          {
            const path = "http://localhost:3000/products/" + this.id;
            const body = [{
              "propName": "name", "value": result.value.name.value
            },{
              "propName": "price", "value": result.value.price.value
            },{
              "propName": "category", "value": result.value.category.value
            }];
          this.http.patch<any>(path,body).subscribe(response => {
            console.log(response);
            if(response && response.message === "Created product successfully") {
              console.log(response['createdProduct']);
            }
          });           
          } else {
          }
      } else {
      }
      });
  
  }

  deleteProduct() {
    const path = "http://localhost:3000/products/" + this.id;

    this.http.delete(path).subscribe(response => {
      console.log(response);
    });
  }

  

}
