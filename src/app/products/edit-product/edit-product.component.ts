import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  myForm: FormGroup;
  flag;

  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<EditProductComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.myForm = fb.group({
      //selectedOS: [this.settings.os,Validators.required],
      name: [this.data.name,Validators.required],
      price: [this.data.price,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      category: [this.data.category,Validators.required]
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
