import { Component, OnInit, Input } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() name : string;
  @Input() price : string;
  @Input() category : string;
  @Input() id : string;


  ngOnInit() {
  }

  editProduct() {
    // call edit product with id
  }

  deleteProduct() {
    const path = "http://localhost:3000/products/" + this.id;

    this.http.delete(path).subscribe(response => {
      console.log(response);
    });
  }

}
