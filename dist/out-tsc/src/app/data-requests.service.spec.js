import { TestBed } from '@angular/core/testing';
import { DataRequestsService } from './data-requests.service';
describe('DataRequestsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DataRequestsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data-requests.service.spec.js.map