import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, switchMap, tap, filter } from 'rxjs/operators';

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

  /**
   * Get nearby places for the given type, based on your current position.
   * 
   * @param type The type (ex: ATM)
   * @param onProgressChanged Optional handler to be called when there's some progress during download
   * 
   * @returns The places nearby
   */
  public getNearby(type: string, onProgressChanged?: (progress: number) => void): Observable<Array<Place>> {
    if (!onProgressChanged) {
      return this._currentPosition.pipe(
        switchMap(position => this.http
          .post<Array<Place>>('/nearby', { type: type, location: position })));
    } else {
      return this._currentPosition.pipe(
        switchMap(position => {
          const request = new HttpRequest('POST', '/nearby',
            { type: type, location: position },
            { reportProgress: true, responseType: 'json' });

          return this.http
            .request<Array<Place>>(request);
        }),
        tap(event => {
          if (event.type === HttpEventType.DownloadProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgressChanged(progress);
          }
        }),
        filter(event => event.type === HttpEventType.Response),
        map((event: HttpResponse<Array<Place>>) => event.body)
      );
    }
  }

  public get currentPosition(): Observable<Place> {
    return this._currentPosition;
  }
}
