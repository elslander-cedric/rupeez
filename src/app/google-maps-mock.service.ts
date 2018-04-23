import { Injectable } from '@angular/core';
import { GoogleMapsService } from '@rupeez/google-maps.service';

@Injectable()
export class GoogleMapsMockService {

  /**
   * This will load the Google Maps API script (if necessary)
   */
  public load(): Promise<any> {

    return new Promise((resolve) => {
      resolve(false);
    });
  }
}
