import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { LocatorService } from './locator.service';
import { Place } from './place';

// TODO: needs more tests => see code coverage report

describe('LocatorService', () => {

    beforeAll(() => {
        spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
            args[0]({
                coords: {
                    latitude: 0,
                    longitude: 0
                }
            } as Position);
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

    it('should get places nearby', async(
        inject([LocatorService, HttpTestingController], (locatorService: LocatorService, backend: HttpTestingController) => {
            locatorService.getNearby('atm').subscribe((places: Array<Place>) => {
                console.log('get nearby mock reply');

                expect(places).toEqual([
                    {
                        longitude: 0,
                        latitude: 0
                    } as Place
                ]);
            });

            backend.expectOne({ url: '/nearby', method: 'POST' }).flush([
                {
                    longitude: 0,
                    latitude: 0
                } as Place
            ]);

        })
    ));

});
