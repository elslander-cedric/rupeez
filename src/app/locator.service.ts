import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class LocatorService implements LocationProvider {

  private _currentPosition: Observable<Place>;

  constructor(private http: HttpClient) {
    this._currentPosition = new Observable<Place>((observer: Observer<Place>) => {
      navigator.geolocation.watchPosition(
        (position: Position) => observer.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        } as Place), err => console.log(err), { maximumAge: 10000 });
    });
  }

  public getNearby(type: string): Observable<Array<Place>> {
    return this._currentPosition
      .switchMap(position => this.http
        .post<Array<Place>>('/nearby', { type: type, location: position }));
  }

  public get currentPosition(): Observable<Place> {
    return this._currentPosition;
  }
}
