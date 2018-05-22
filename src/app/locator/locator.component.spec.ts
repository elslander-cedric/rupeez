import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { LocatorMockService } from '@rupeez/locator-mock.service';

import { LocatorComponent } from './locator.component';
import { GoogleMapsService } from '@rupeez/google-maps.service';
import { BrowserNativeService } from '@rupeez/browser-native.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

xdescribe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;
  let debugElement: DebugElement;
  let googleMapsService: GoogleMapsService;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
      args[0]({ coords: { latitude: 51.054342, longitude: 3.717424 } } as Position);
    });
  });

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LocatorComponent],
        providers: [
          BrowserNativeService,
          GoogleMapsService,
          {
            provide: 'GoogleMapsService',
            useClass: GoogleMapsService
          },
          {
            provide: 'LocationProvider',
            useClass: LocatorMockService
          }
        ]
      }).compileComponents();

      // create component and test fixture
      fixture = TestBed.createComponent(LocatorComponent);
      debugElement = fixture.debugElement;
      component = fixture.componentInstance;
      googleMapsService = TestBed.get(GoogleMapsService);

      fixture.detectChanges();
  }));

  it('should display map', async(() => {
    debugElement
      .query(By.css('.map'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = debugElement.query(By.css('map')).nativeElement.innerText;
      expect(value).toEqual('');
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('map should be centered on current position', () => {
      expect(Math.round(component.map.getCenter().lat())).toEqual(51);
      expect(Math.round(component.map.getCenter().lng())).toEqual(4);
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
