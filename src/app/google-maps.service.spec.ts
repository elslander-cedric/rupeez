import { TestBed, inject } from '@angular/core/testing';
import { BrowserNativeService } from '@rupeez/browser-native.service';
import { GoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleMapsService,
        BrowserNativeService
      ]
    });
  });

  it('should be created', inject([GoogleMapsService], (service: GoogleMapsService) => {
    expect(service).toBeTruthy();
  }));
});
