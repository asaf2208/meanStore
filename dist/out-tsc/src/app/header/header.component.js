import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRoute } from '@angular/router';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(globals, router, route) {
        this.globals = globals;
        this.router = router;
        this.route = route;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        this.globals.logout();
        this.router.navigateByUrl("");
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Globals, Router, ActivatedRoute])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map