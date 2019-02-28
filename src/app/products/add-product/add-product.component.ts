import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  myForm: FormGroup;
  flag: boolean;

  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<AddProductComponent>) {
    this.myForm = fb.group({
      // selectedOS: ['',Validators.required],
      name: ['',[Validators.required]],
      price: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      category: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  onClose() : void {
    let set : any;

    this.flag = true;

    set = {
      "name": this.name,
      "price": this.price,
      "category": this.category
    };

    this.dialogRef.close({ value: set, flag : this.flag});
  }


  get name() {
    return this.myForm.get('name');
  };

  get price() {
    return this.myForm.get('price');
  };

  get category() {
    return this.myForm.get('category');
  };

}
