import { TestBed, inject, async } from '@angular/core/testing';
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

  it('should load Google Maps script', async(
    inject([GoogleMapsService, BrowserNativeService],
      (gmapsService: GoogleMapsService, browserNativeService: BrowserNativeService) => {
        const documentRef = browserNativeService.getNativeDocument();

        expect(documentRef).toBeTruthy();

        gmapsService.load().then((loaded: boolean) => {
          const gmapsEl = documentRef.getElementById('gmaps');
          expect(gmapsEl).toBeTruthy();

          gmapsService.load().then((loaded2: boolean) => {
            expect(loaded2).toBeFalsy();
          });
        });
      })));
});
