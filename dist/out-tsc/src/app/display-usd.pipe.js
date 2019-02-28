import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var DisplayUsdPipe = /** @class */ (function () {
    function DisplayUsdPipe() {
    }
    DisplayUsdPipe.prototype.transform = function (value, args) {
        return '$' + value;
    };
    DisplayUsdPipe = tslib_1.__decorate([
        Pipe({
            name: 'displayUsd'
        })
    ], DisplayUsdPipe);
    return DisplayUsdPipe;
}());
export { DisplayUsdPipe };
//# sourceMappingURL=display-usd.pipe.js.map