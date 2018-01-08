import { Injectable } from '@angular/core';
import { Place } from '@rupeez/place';
import { LocationProvider } from '@rupeez/location-provider';
import { Observable, Observer } from 'rxjs/Rx';

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

  public getCurrentPosition(): Observable<{ longitude: number, latitude: number }> {    
    return new Observable((observer: Observer<{ longitude: number, latitude: number }>) => {
      navigator.geolocation.watchPosition(
        (position: Position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
    });
  }
}
