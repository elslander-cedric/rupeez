import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/observable/of';

@Injectable()
export class LocatorMockService implements LocationProvider {

  constructor() { }

  public getNearby(type: string): Observable<Array<Place>> {
    return Observable.of([
      { latitude: 51.054342, longitude: 3.717424 } as Place
    ]);
  }

  public get currentPosition(): Observable<Place> {
    return Observable.of(
      { latitude: 51.054342, longitude: 3.717424 } as Place
    );
  }
}
