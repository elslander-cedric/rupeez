/**
 * Place
 */
export class Place {

    /**
     * Longitude of this Place
     */
    private _longitude: number;

    /**
     * Latitude of this Place
     */
    private _latitude: number;

    /**
     * Get the longitude
     */
    public get longitude(): number {
        return this._longitude;
    }

    /**
     * Set the longitude
     */
    public set longitude(longitude: number) {
        this._longitude = longitude;
    }

    /**
     * Get the latitude
     */
    public get latitude(): number {
        return this._latitude;
    }

    /**
     * Set the latitude
     */
    public set latitude(latitude: number) {
        this._latitude = latitude;
    }
}
