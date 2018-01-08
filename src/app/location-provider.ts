import { Observable } from 'rxjs/Rx';

import { Place } from '@rupeez/place';

export interface LocationProvider {

    getNearby(type: string): Observable<Array<Place>>;
    getCurrentPosition(): Observable<{ longitude: number, latitude: number }>;
}