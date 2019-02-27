import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  loginForm: FormGroup;


  constructor(fb: FormBuilder,private http: HttpClient, private router: Router,  private route: ActivatedRoute, private globals: Globals) {
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

  onSubmit(evt) {
      this.http.post<any>('http://localhost:3000/users/adduser',
      {
        "firstname": this.username.value,
        "password": this.password.value,
        "fullname": this.fullname.value,
        "email": this.email.value,
        "isAdmin": false
      }).subscribe((data) => {
          console.log(data);
          if(data.message === "Created user successfully") {
            this.globals.setUser(data.createdUser._id,data.createdUser.username,data.createdUser.fullname,data.createdUser.email,data.createdUser.isAdmin);
            this.router.navigateByUrl("/products");
          }
      });


  }


}
