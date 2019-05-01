import { TestBed } from '@angular/core/testing';

import { ServiceNowService } from './service-now.service';

describe('ServiceNowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceNowService = TestBed.get(ServiceNowService);
    expect(service).toBeTruthy();
  });
});
