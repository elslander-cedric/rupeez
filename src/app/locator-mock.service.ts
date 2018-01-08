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
      {
        latitude: 51.064173,
        longitude: 3.697017
      } as Place
    ]);
  }

  public getCurrentPosition(): Observable<Place> {
    return new Observable((observer: Observer<Place>) => {
      navigator.geolocation.watchPosition(
        (position: Position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          } as Place);
        });
    });
  }
}
