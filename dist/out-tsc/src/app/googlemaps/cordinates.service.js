import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
var BACKEND_URL = environment.apiUrl + '/auth/countries/';
var CordinatesService = /** @class */ (function () {
    function CordinatesService(http) {
        this.http = http;
    }
    CordinatesService.prototype.getCord = function (CountryName) {
        return this.http.get(BACKEND_URL + CountryName);
    };
    CordinatesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CordinatesService);
    return CordinatesService;
}());
export { CordinatesService };
//# sourceMappingURL=cordinates.service.js.map