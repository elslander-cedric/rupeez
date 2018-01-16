import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorService } from '../locator.service';
import { LocatorComponent } from './locator.component';

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

  beforeAll(() => {
    spyOn(navigator.geolocation, 'watchPosition').and.callFake((...args) => {
      args[0]({ coords: { latitude: 0, longitude: 0 } } as Position);
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
        useClass: LocatorService
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('map should be centered on current position', () => {
    expect(component.map.getCenter().lat).toEqual(0);
    expect(component.map.getCenter().lat).toEqual(0);
  });

  it('map should contain markers of atms nearby', () => {
    // TODO-FIXME
  });
});
