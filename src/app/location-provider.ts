import { Place } from '@rupeez/place';
import { Observable } from 'rxjs';

/**
 * Provider for Location
 */
export interface LocationProvider {

    /**
     * Get the current position
     */
    currentPosition: Observable<Place>;

    /**
     * Get nearby places for the given type, based on your current position.
     *
     * @param type The type (ex: ATM)
     * @param onProgressChanged Optional handler to be called when there's some progress during download
     *
     * @returns The places nearby
     */
    getNearby(type: string, onProgressChanged?: (progress: number) => void): Observable<Array<Place>>;
}
