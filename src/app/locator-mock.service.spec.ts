import { async, inject, TestBed } from '@angular/core/testing';

import { LocatorMockService } from './locator-mock.service';
import { Place } from '@rupeez/place';

describe('LocatorMockService', () => {

  beforeAll(() => {
    spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
      args[0]({ coords: { latitude: 51.054342, longitude: 3.717424 } } as Position);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocatorMockService]
    });
  });

  it('should be created', inject([LocatorMockService], (service: LocatorMockService) => {
    expect(service).toBeTruthy();
  }));

  it('should get current position', async(
    inject([LocatorMockService], (locatorService: LocatorMockService) => {
      locatorService.currentPosition.subscribe((place: Place) => {
        expect(place.longitude).toBeDefined();
        expect(place.latitude).toBeDefined();
      });
    })
  ));

  it('should get places nearby', async(
    inject([LocatorMockService], (locatorService: LocatorMockService) => {
      locatorService.getNearby('atm').subscribe((places: Array<Place>) => {
        expect(places.length).toBeGreaterThan(0);
      });
    })
  ));
});

describe('LocatorService error cases', () => {
  beforeAll(() => {
      console.log = jasmine.createSpy('console.log');

      spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
          args[1]('user refused to share the location');
      });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocatorMockService]
    });
  });

  it('should handle the case when location sharing is refused', async(
      inject([LocatorMockService], (locatorService: LocatorMockService) => {
          locatorService.currentPosition.subscribe();
          expect(console.log).toHaveBeenCalledWith('user refused to share the location');
      })
  ));
});
