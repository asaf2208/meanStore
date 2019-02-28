import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../globals';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(fb, http, router, route, globals) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.globals = globals;
        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            fullname: ['', Validators.required]
        });
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(SignupComponent.prototype, "email", {
        get: function () {
            return this.loginForm.get('email');
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SignupComponent.prototype, "username", {
        get: function () {
            return this.loginForm.get('username');
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SignupComponent.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SignupComponent.prototype, "fullname", {
        get: function () {
            return this.loginForm.get('fullname');
        },
        enumerable: true,
        configurable: true
    });
    ;
    SignupComponent.prototype.onSubmit = function (evt) {
        var _this = this;
        this.http.post('http://localhost:3000/users/adduser', {
            "firstname": this.username.value,
            "password": this.password.value,
            "fullname": this.fullname.value,
            "email": this.email.value,
            "isAdmin": false
        }).subscribe(function (data) {
            console.log(data);
            if (data.message === "Created user successfully") {
                _this.globals.setUser(data.createdUser._id, data.createdUser.username, data.createdUser.fullname, data.createdUser.email, data.createdUser.isAdmin);
                _this.router.navigateByUrl("/products");
            }
        });
    };
    SignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, ActivatedRoute, Globals])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map