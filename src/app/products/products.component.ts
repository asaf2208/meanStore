import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  searchTerm: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // const product1 = {
    //   "name": "Shoko",
    //   "price": 10,
    //   "category": "dairy"
    // }
    // const product2 = {
    //   "name": "bamba",
    //   "price": 4,
    //   "category": "snacks"
    // }
    // const product3 = {
    //   "name": "cheetos",
    //   "price": 6,
    //   "category": "snacks"
    // }
    // const product4 = {
    //   "name": "coca cola",
    //   "price": 10,
    //   "category": "drinks"
    // }
    // const product5 = {
    //   "name": "apple",
    //   "price": 3,
    //   "category": "fruits"
    // }
    // this.products.push(product1);
    // this.products.push(product2);
    // this.products.push(product3);
    // this.products.push(product4);
    // this.products.push(product5);
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data['products'];
      });
  }

  search() {
    this.http.get<any>('http://localhost:3000/products/search/' + this.searchTerm)
      .subscribe((data) => {
        this.products = data['products'];
      });
  }

}
