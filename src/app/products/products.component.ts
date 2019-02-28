import { PeriodicElement } from './../admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  searchTerm: string;

  constructor(private route: ActivatedRoute, private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data['products'];
      });
  }

  search() {
    this.http.get<any>('http://localhost:3000/products/' + this.searchTerm)
      .subscribe((data) => {
        this.products = data['products'];
      });
  }

  addProduct() {
    let dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null)
      {
        if(result.flag == true)
          {
          // this.configservice.addKey(result.value.parameter,result.value.value,result.value.type).subscribe(response => {
          //   console.log('add key response : ',response);
          //   if(response.errorCode == 0 ) {
          //     this.products.push(1);
          //   } else {
          //     console.log('error Code : ',response.errorCode);
          //   }
          // });
          console.log(result);
          this.http.post<any>("http://localhost:3000/products",{
              "name": result.value.name.value,
              "price": result.value.price.value,
              "category": result.value.category.value
          }).subscribe(response => {
            console.log(response);
            if(response && response.message === "Created product successfully") {
              console.log(response['createdProduct']);
              this.products.push(response['createdProduct']);
            }
          });           
          } else {
          }
      } else {
      }
      });
  }

}
