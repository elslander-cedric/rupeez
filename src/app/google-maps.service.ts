import { Injectable } from '@angular/core';
import { BrowserNativeService } from '@rupeez/browser-native.service';

@Injectable()
export class GoogleMapsService {

  constructor(private _browserNative: BrowserNativeService) {}

  /**
   * This will load the Google Maps API script (if necessary)
   */
  public load(): Promise<any> {
    const documentRef = this._browserNative.getNativeDocument();
    const windowRef = this._browserNative.getNativeWindow();

    const gmapsKey = 'AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M'; // TODO: load from config
    const gmapsCallback = 'onGoogleMapsLoaded';

    return new Promise((resolve) => {
      if (!documentRef.getElementById('gmaps')) {
        windowRef[gmapsCallback] = resolve;

        const gmapsScript: HTMLScriptElement = documentRef.createElement('script');

        Object.assign(gmapsScript, {
          id: 'gmaps',
          type: 'text/javascript',
          async: true,
          defer: true,
          src: 'https://maps.googleapis.com/maps/api/js?' +
               `key=${gmapsKey}&` +
               `libraries=geometry,places&` +
               `callback=${gmapsCallback}`
        });

        documentRef.body.appendChild(gmapsScript);
      } else {
        resolve();
      }
    });
  }
}
