import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  myForm: FormGroup;
  flag;

  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<EditBranchComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.myForm = fb.group({
      //selectedOS: [this.settings.os,Validators.required],
      name: [this.data.name,Validators.required],
      street: [this.data.street,Validators.required],
      city: [this.data.city,Validators.required]
    });
  }

  ngOnInit() {
  }

  onClose() : void {
    let set : any;

    this.flag = true;

    set = {
      "name": this.name,
      "street": this.street,
      "city": this.city
    };

    this.dialogRef.close({ value: set, flag : this.flag});
  }


  get name() {
    return this.myForm.get('name');
  };

  get street() {
    return this.myForm.get('street');
  };

  get city() {
    return this.myForm.get('city');
  };


}
