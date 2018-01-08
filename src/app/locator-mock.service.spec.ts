import { TestBed, inject } from '@angular/core/testing';

import { LocatorMockService } from './locator-mock.service';

describe('LocatorMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocatorMockService]
    });
  });

  it('should be created', inject([LocatorMockService], (service: LocatorMockService) => {
    expect(service).toBeTruthy();
  }));
});
