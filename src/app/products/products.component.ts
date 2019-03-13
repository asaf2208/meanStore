import { AddProductComponent } from './add-product/add-product.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Socket } from 'ngx-socket-io';
import { Globals } from '../globals';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories = [];
  products = [];
  searchName: string;
  searchPrice: string;
  searchCategory: string;

  constructor(private globals: Globals, private socket: Socket,private route: ActivatedRoute, private http: HttpClient,public dialog: MatDialog) {
    this.setSockets();
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data['products'];
      });
      this.http.get<any>('http://localhost:3000/products/groupbycategory')
      .subscribe((data) => {
        let sum = 0;

        for (let i = 0; i < data.docs.length; i++) {
          sum += data.docs[i].count;
        }

        this.categories.push({ _id: 'All', count: sum });
        this.categories.push(...data['docs']);
      });
  }

  search() {
    let categoryToSearch = this.searchCategory;

    if (this.searchCategory === 'All') {
      categoryToSearch = '';
    }

    let url = 'http://localhost:3000/products/search?' + (this.searchName ? 'name=' + this.searchName : 'name=') + (this.searchPrice ? '&price=' + this.searchPrice : '&price=') + (categoryToSearch ? '&category='+ categoryToSearch : '&category=');
    
    this.http.get<any>(url)
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

  setSockets() {
    this.socket.on('deleteProduct',(productID : any) => {
      for (let index = 0; index < this.products.length; index++) {
        console.log(this.products[index]);
        if(productID == this.products[index]._id) {
          this.products.splice(index,1);
        }
      }
    });

    this.socket.on('editProduct',(result) => {
      for (let index = 0; index < this.products.length; index++) {
        console.log(this.products[index]);
        if(result.id == this.products[index]._id) {
          this.products[index] = {
            "name" : result.name,
            "price" : result.price,
            "category" : result.category
          };
        }
      }
    });
  }

}
