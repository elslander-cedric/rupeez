export class Place {
    private _longitude: number;
    private _latitude: number;

    public get longitude(): number {
        return this._longitude;
    }

    public set longitude(longitude: number) {
        this._longitude = longitude;
    }

    public get latitude(): number {
        return this._latitude;
    }

    public set latitude(latitude: number) {
        this._latitude = latitude;
    }
}
