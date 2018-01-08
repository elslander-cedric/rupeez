import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatorMockService } from '@rupeez/locator-mock.service';

import { LocatorComponent } from './locator.component';

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

  // TODO: needs more tests => see code coverage report
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ LocatorComponent ],
      providers: [{
        provide: 'LocationProvider',
        useClass: LocatorMockService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
