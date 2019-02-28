import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(fb: FormBuilder,private http: HttpClient, private router: Router,  private route: ActivatedRoute, private globals: Globals) {
    this.loginForm = fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

  }
  ngOnInit() {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  };  

  onSubmit(evt) {
    this.http.post<any>('http://localhost:3000/users/login',
    {
      "username": this.username.value,
      "password": this.password.value,
    }).subscribe((data) => {
        console.log(data);
        if(data && data.errorCode == 0) {
          this.globals.setUser(data._id,data.username,data.fullname,data.email,data.isAdmin);
          sessionStorage.setItem('user',JSON.stringify(this.globals.user));
          this.router.navigateByUrl("/products");
        } else {
          console.warn('wrong credentials');
        }
    });


}


}
