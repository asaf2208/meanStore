import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, http, router, route, globals) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.globals = globals;
        this.loginForm = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(LoginComponent.prototype, "username", {
        get: function () {
            return this.loginForm.get('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.loginForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    ;
    LoginComponent.prototype.onSubmit = function (evt) {
        var _this = this;
        this.http.post('http://localhost:3000/users/login', {
            "username": this.username.value,
            "password": this.password.value,
        }).subscribe(function (data) {
            console.log(data);
            if (data && data.errorCode == 0) {
                _this.globals.setUser(data._id, data.username, data.fullname, data.email, data.isAdmin);
                _this.router.navigateByUrl("/products");
            }
            else {
                console.warn('wrong credentials');
            }
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, ActivatedRoute, Globals])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map