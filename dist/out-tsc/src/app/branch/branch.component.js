import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var BranchComponent = /** @class */ (function () {
    function BranchComponent() {
    }
    BranchComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], BranchComponent.prototype, "name", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], BranchComponent.prototype, "street", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], BranchComponent.prototype, "city", void 0);
    BranchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-branch',
            templateUrl: './branch.component.html',
            styleUrls: ['./branch.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], BranchComponent);
    return BranchComponent;
}());
export { BranchComponent };
//# sourceMappingURL=branch.component.js.map