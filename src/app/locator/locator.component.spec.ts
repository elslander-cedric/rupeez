import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatorMockService } from '@rupeez/locator-mock.service';

import { LocatorComponent } from './locator.component';
import { GoogleMapsService } from '@rupeez/google-maps.service';
import { BrowserNativeService } from '@rupeez/browser-native.service';
import { GoogleMapsMockService } from '@rupeez/google-maps-mock.service';

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

  beforeAll(() => {
    spyOn(google.maps, 'Map').and.returnValue((() => {
      let lat = 51.054342;
      let lng = 3.717424;

      return {
        getCenter: () =>  {
          return {
            lat: () => lat,
            lng: () => lng
          };
        },
        setCenter: (position) => {
          lat = position.lat;
          lng = position.lng;
        },
        setZoom: () => {}
      };
    })());
  });

  beforeAll(() => {
    spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
      args[0]({ coords: { latitude: 51.054342, longitude: 3.717424 } } as Position);
    });
  });

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule],
      declarations: [LocatorComponent],
      providers: [
        {
          provide: 'GoogleMapsService',
          useClass: GoogleMapsMockService
        },
        BrowserNativeService,
        {
          provide: 'LocationProvider',
          useClass: LocatorMockService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('map should be centered on current position', () => {
      expect(component.map.getCenter().lat()).toEqual(51.054342);
      expect(component.map.getCenter().lng()).toEqual(3.717424);
  });

  it('map should contain markers of atms nearby', () => {
    expect(component.markers.length).toBeGreaterThan(0);
  });

  it('map should be centered when marker is clicked', () => {
    google.maps.event.trigger(component.markers[0], 'click');
    expect(component.map.getCenter().lat())
      .toBe(component.markers[0].getPosition().lat());
    expect(component.map.getCenter().lng())
      .toBe(component.markers[0].getPosition().lng());
  });
});
