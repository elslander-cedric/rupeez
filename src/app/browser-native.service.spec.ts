import { TestBed, inject } from '@angular/core/testing';

import { BrowserNativeService } from './browser-native.service';

describe('BrowserNativeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserNativeService]
    });
  });

  it('should be created', inject([BrowserNativeService], (service: BrowserNativeService) => {
    expect(service).toBeTruthy();
  }));
});
