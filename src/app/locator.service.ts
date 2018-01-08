import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class LocatorService implements LocationProvider {

  private _currentPosition = new Subject<{ longitude: number, latitude: number }>();

  constructor(private http: Http) {
    navigator.geolocation.watchPosition(
      (position: Position) => {
        console.log('emit new position: %o', position);

        this._currentPosition.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, err => console.log(err), { maximumAge: 10000 });
  }

  public getNearby(type: string): Observable<Array<Place>> {
    console.log('get nearby %s', type);

    return this.getCurrentPosition()
      .switchMap((position) => {
        console.log('get nearby %s from locator service', type);

        return this.http
          .post('/nearby', { type: type, location: position })
          .map((response) => {
            return response.json();
          });
      });
  }

  public getCurrentPosition(): Observable<{ longitude: number, latitude: number }> {
    console.log('get current position');
    
    return this._currentPosition
      .debounceTime(1000)
      .distinctUntilChanged();
  }
}
