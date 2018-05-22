import { Injectable, OnDestroy } from '@angular/core';
import { BrowserNativeService } from '@rupeez/browser-native.service';

@Injectable()
export class GoogleMapsService implements OnDestroy {

  constructor(private _browserNative: BrowserNativeService) {}

  ngOnDestroy() {
    // console.debug('GoogleMapsService destroy');
  }

  /**
   * This will load the Google Maps API script (if necessary)
   */
  public load(): Promise<any> {
    const documentRef = this._browserNative.getNativeDocument();
    const windowRef = this._browserNative.getNativeWindow();

    const gmapsKey = 'AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M'; // TODO: load from config
    const gmapsCallback = 'onGoogleMapsLoaded';

    return new Promise((resolve: (loaded: boolean) => void, reject) => {
      // let timeoutId;

      // if (!documentRef.getElementById('gmaps')) {
      if (!windowRef[gmapsCallback]) {
        // console.debug('need to add google maps script');

        /*
        timeoutId = setTimeout(() => {
          console.error('could not load google maps script');
          reject();
        }, 1000);
        */

        windowRef[gmapsCallback] = () => {
          // clearTimeout(timeoutId);
          // console.debug('google maps script loaded');
          resolve(true);
        };

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
        console.warn('google maps script already present');
        resolve(false);
      }
    });
  }
}
