import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { LocatorService } from './locator.service';
import { Place } from './place';

describe('LocatorService', () => {

    beforeAll(() => {
        spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
            args[0]({ coords: { latitude: 51.054342, longitude: 3.717424 } } as Position);
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule],
            providers: [
                LocatorService
            ]
        });
    }));

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should be created', inject([LocatorService], (service: LocatorService) => {
        expect(service).toBeTruthy();
    }));

    it('should get current position', async(
        inject([LocatorService], (locatorService: LocatorService) => {
            locatorService.currentPosition.subscribe((place: Place) => {
                expect(place).toEqual(
                    { latitude: 51.054342, longitude: 3.717424 } as Place
                );
            });
        })
    ));

    it('should get places nearby', async(
        inject([LocatorService, HttpTestingController], (locatorService: LocatorService, backend: HttpTestingController) => {
            locatorService.getNearby('atm').subscribe((places: Array<Place>) => {
                expect(places).toEqual([{ longitude: 0, latitude: 0 } as Place]);
            });

            backend.expectOne({ url: '/nearby', method: 'POST' }).flush([
                { longitude: 0, latitude: 0 } as Place
            ]);
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule],
            providers: [
                LocatorService
            ]
        });
    }));

    it('should handle the case when location sharing is refused', async(
        inject([LocatorService], (locatorService: LocatorService) => {
            locatorService.currentPosition.subscribe();
            expect(console.log).toHaveBeenCalledWith('user refused to share the location');
        })
    ));
});
