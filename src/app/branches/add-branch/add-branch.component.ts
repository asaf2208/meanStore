import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  myForm: FormGroup;
  flag: boolean;

  constructor(fb: FormBuilder,public dialogRef: MatDialogRef<AddBranchComponent>) {
    this.myForm = fb.group({
      // selectedOS: ['',Validators.required],
      name: ['',[Validators.required]],
      street: ['',[Validators.required]],
      city: ['',Validators.required]
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
