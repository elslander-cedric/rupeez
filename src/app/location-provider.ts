import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';

export interface LocationProvider {

    currentPosition: Observable<Place>;
    getNearby(type: string, onProgressChanged?: (progress: number) => void): Observable<Array<Place>>;
}
