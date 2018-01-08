import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { LocatorService } from './locator.service';

describe('LocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LocatorService]
    });
  });

  it('should be created', inject([LocatorService], (service: LocatorService) => {
    expect(service).toBeTruthy();
  }));
});
