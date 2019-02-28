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
  searchTerm1: string;
  searchTerm2: string;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

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

  
}
