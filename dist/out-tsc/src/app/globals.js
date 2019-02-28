import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
var Globals = /** @class */ (function () {
    function Globals() {
        this.user = null;
    }
    ;
    Globals.prototype.setUser = function (id, userName, fullName, email, isAdmin) {
        this.user = new User(id, userName, fullName, email, isAdmin);
    };
    Globals.prototype.getUser = function () {
        return this.user;
    };
    Globals.prototype.logout = function () {
        this.user = null;
    };
    Globals = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], Globals);
    return Globals;
}());
export { Globals };
var User = /** @class */ (function () {
    function User(id, userName, fullName, email, isAdmin) {
        this.id = id;
        this.username = userName;
        this.fullName = fullName;
        this.email = email;
        this.isAdmin = isAdmin;
    }
    User.prototype.getFullName = function () {
        return this.fullName;
    };
    return User;
}());
//# sourceMappingURL=globals.js.map