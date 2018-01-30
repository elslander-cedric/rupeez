import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';

/**
 * Service that mocks location data (not the current position)
 */
@Injectable()
export class LocatorMockService implements LocationProvider {

  /**
   * Current position (real)
   */
  private _currentPosition: Observable<Place>;

  /**
   * Constructor
   */
  constructor() {
    this._currentPosition = new Observable<Place>((observer: Observer<Place>) => {
      navigator.geolocation.watchPosition(
        (position: Position) => observer.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        } as Place), err => console.log(err), { maximumAge: 10000 });
    });
  }

  /**
   * Get nearby places for the given type, based on your current position.
   *
   * @param type The type (ex: ATM)
   *
   * @returns The places nearby
   */
  public getNearby(type: string): Observable<Array<Place>> {
    return of([
      { latitude: 51.07, longitude: 3.74 } as Place
    ]);
  }

  /**
   * Get the current position
   */
  public get currentPosition(): Observable<Place> {
    return this._currentPosition;
  }
}
