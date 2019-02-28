import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(route, http) {
        this.route = route;
        this.http = http;
        this.products = [];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('http://localhost:3000/products')
            .subscribe(function (data) {
            _this.products = data['products'];
        });
    };
    ProductsComponent.prototype.search = function () {
        var _this = this;
        var url = 'http://localhost:3000/products/search?name=' + this.searchTerm + '&price=' + this.searchTerm1 + '&category=' + this.searchTerm2;
        console.log(url);
        this.http.get(url)
            .subscribe(function (data) {
            _this.products = data['products'],
                console.log(data);
        });
    };
    ProductsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, HttpClient])
    ], ProductsComponent);
    return ProductsComponent;
}());
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map