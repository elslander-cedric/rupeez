import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocatorService implements LocationProvider {

  private _currentPosition = new Subject<Place>();

  constructor(private http: HttpClient) {
    console.log('create locator service');
    
    navigator.geolocation.watchPosition(
      (position: Position) => this._currentPosition.next({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      } as Place), err => console.log(err), { maximumAge: 10000 });
  }

  public getNearby(type: string): Observable<Array<Place>> {
    console.log('get nearby');
    
    return this.getCurrentPosition()
      .switchMap((position) => {
        console.log('send request');
        return this.http
        .post<Array<Place>>('/nearby', { type: type, location: position })});
        
  }

  public getCurrentPosition(): Observable<Place> {
    return this._currentPosition
      .debounceTime(1000)
      .distinctUntilChanged();
  }
}
