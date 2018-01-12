import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LocatorService } from '../locator.service';
import { LocatorComponent } from './locator.component';

// TODO: needs more tests => see code coverage report

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

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

  it('should get places nearby', async(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.expectOne({ url: '/nearby', method: 'POST' });
    })
  ));

});
