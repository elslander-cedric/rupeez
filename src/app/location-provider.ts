import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';

export interface LocationProvider {

    getNearby(type: string): Observable<Array<Place>>;
    getCurrentPosition(): Observable<Place>;
}
