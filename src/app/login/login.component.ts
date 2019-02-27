import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['',[Validators.required,Validators.email]],
      username: ['',Validators.required],
      password: ['',Validators.required],
      fullname: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.loginForm.get('email');
  };

  get username() {
    return this.loginForm.get('username');
  };

  get password() {
    return this.loginForm.get('password');
  };  

  get fullname() {
    return this.loginForm.get('fullname');
  };  


}
