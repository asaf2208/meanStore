import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
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
      name: ['',[Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      street: ['',[Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['',[Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]*$/)]]
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
