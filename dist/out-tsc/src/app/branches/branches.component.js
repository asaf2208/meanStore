import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
var BranchesComponent = /** @class */ (function () {
    function BranchesComponent(route, http) {
        this.route = route;
        this.http = http;
        this.branches = [];
    }
    BranchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:3000/branches')
            .subscribe(function (data) {
            _this.branches = data['branches'];
        });
    };
    BranchesComponent.prototype.search = function () {
        var _this = this;
        this.http.get('http://localhost:3000/branches/' + this.searchTerm)
            .subscribe(function (data) {
            _this.branches = data['branches'];
        });
    };
    BranchesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-branches',
            templateUrl: './branches.component.html',
            styleUrls: ['./branches.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, HttpClient])
    ], BranchesComponent);
    return BranchesComponent;
}());
export { BranchesComponent };
//# sourceMappingURL=branches.component.js.map