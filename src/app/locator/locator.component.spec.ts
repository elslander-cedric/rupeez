import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatorMockService } from '@rupeez/locator-mock.service';

import { LocatorComponent } from './locator.component';

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

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
      declarations: [LocatorComponent],
      providers: [{
        provide: 'LocationProvider',
        useClass: LocatorMockService
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('map should be centered on current position', () => {
    expect(component.map.getCenter().lat()).toEqual(51.054342);
    expect(component.map.getCenter().lng()).toEqual(3.7174239999999372);
  });

  it('map should contain markers of atms nearby', () => {
    expect(component.markers.length).toBeGreaterThan(0);
  });

  it('map should be centered when marker is clicked', () => {
    google.maps.event.trigger(component.markers[0], 'click'),
      expect(component.map.getCenter()).toBe(component.markers[0].getPosition());
  });
});
