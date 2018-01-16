import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/observable/of';

@Injectable()
export class LocatorMockService implements LocationProvider {

  private _currentPosition: Observable<Place>;

  constructor() {
    this._currentPosition = new Observable<Place>((observer: Observer<Place>) => {
      navigator.geolocation.watchPosition(
        (position: Position) => observer.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        } as Place), err => console.log(err), { maximumAge: 10000 });
    });
  }

  public getNearby(type: string): Observable<Array<Place>> {
    return Observable.of([
      { latitude: 51.07, longitude: 3.74 } as Place
    ]);
  }

  public get currentPosition(): Observable<Place> {
    return this._currentPosition;
  }
}
