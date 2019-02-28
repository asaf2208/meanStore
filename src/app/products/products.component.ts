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
  searchTerm1: string;
  searchTerm2: string;


  constructor(private route: ActivatedRoute, private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data['products'];
      });
  }

  search() {
    let url = 'http://localhost:3000/products/search?name=' + this.searchTerm + '&price=' + this.searchTerm1 + '&category='+ this.searchTerm2;
    console.log(url);
    this.http.get<any>(url)
      .subscribe((data) => {
        this.products = data['products'],
        console.log(data);
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
