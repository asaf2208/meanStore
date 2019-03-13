import { TestBed } from '@angular/core/testing';

import { DataRequestsService } from './data-requests.service';

describe('DataRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataRequestsService = TestBed.get(DataRequestsService);
    expect(service).toBeTruthy();
  });
});
