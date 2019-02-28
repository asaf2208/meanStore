import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { CordinatesService } from '../googlemaps/cordinates.service';
var GooglemapsComponent = /** @class */ (function () {
    function GooglemapsComponent(authService, http, cordService) {
        this.authService = authService;
        this.http = http;
        this.cordService = cordService;
        this.lat = 0;
        this.lng = 0;
        this.zoom = 1;
    }
    GooglemapsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getCountries().subscribe(function (data) {
            _this.countries = data.countries;
            _this.markers = [];
            _this.countries.forEach(function (c) {
                _this.cordService.getCord(c).subscribe(function (data) { return _this.markers.push({ let: data.location.lat, lng: data.location.lng }); });
            });
        });
    };
    var _a;
    tslib_1.__decorate([
        ViewChild('ngm'),
        tslib_1.__metadata("design:type", Object)
    ], GooglemapsComponent.prototype, "gmapElement", void 0);
    GooglemapsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-googlemaps',
            templateUrl: './googlemaps.component.html',
            styleUrls: ['./googlemaps.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof AuthService !== "undefined" && AuthService) === "function" ? _a : Object, HttpClient, CordinatesService])
    ], GooglemapsComponent);
    return GooglemapsComponent;
}());
export { GooglemapsComponent };
//# sourceMappingURL=googlemaps.component.js.map