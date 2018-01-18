import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, switchMap, tap } from 'rxjs/operators';

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
    return this._currentPosition.pipe(
      switchMap(position => this.http
        .post<Array<Place>>('/nearby', { type: type, location: position })));
  }

  public getNearbyWithProgress(type: string): Observable<Array<Place>> {
    return this._currentPosition.pipe(
      switchMap(position => {
        const request = new HttpRequest('POST', '/nearby',
          { type: type, location: position },
          { reportProgress: true });

        return this.http
          .request<Array<Place>>(request)
          .pipe(tap(event => {
            if (event.type === HttpEventType.DownloadProgress) {
              const progress = (event.loaded / event.total) * 100;
              console.log(`progress: ${progress}`);
            }
          }), map(event => {
            if (event.type === HttpEventType.Response) {
              const response = event as HttpResponse<Array<Place>>;
              return response.body;
            }
          }));
      }));
  }

  public get currentPosition(): Observable<Place> {
    return this._currentPosition;
  }
}
