import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserNativeService } from '@rupeez/browser-native.service';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import {} from '@types/googlemaps';

/**
 * Component that encapsulates a map
 */
@Component({
  selector: 'rupeez-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent implements OnInit {

  /**
   * Google Map
   */
  map: google.maps.Map;

  /**
   * Markers on the map
   */
  markers = new Array<google.maps.Marker>();

  /**
   * Current position
   */
  position: Observable<Place>;

  /**
   * The places nearby
   */
  places: Observable<Array<Place>>;

  /**
   * Reference to the Google Map element
   */
  @ViewChild('gmap', { read: ElementRef })
  gmap: ElementRef;

  /**
   * Constructor
   *
   * @param _locationProvider Location Provider
   * @param _el Element Reference
   * @param _renderer Renderer
   */
  constructor(
    @Inject('LocationProvider') private locationProvider: LocationProvider,
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _browserNative: BrowserNativeService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadGoogleMaps()
      .then(() => this.init())
      .catch(err => console.error(err));
  }

  /**
   * This will load the Google Maps API script (if necessary)
   */
  private loadGoogleMaps(): Promise<any> {
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

  /**
   * Initialialize map
   */
  private init(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      zoom: 12
    });

    this.locationProvider.currentPosition.subscribe((place: Place) => {
      this.map.setCenter({ lat: place.latitude, lng: place.longitude });
    });

    this.locationProvider
      .getNearby('atm', progress => console.log(`... ${progress}%`))
      .subscribe((places: Array<Place>) =>
        places.map((place: Place) => {
          const marker = new google.maps.Marker({
            position: { lat: place.latitude, lng: place.longitude },
            map: this.map
          });

          marker.addListener('click', function () {
            this.map.setZoom(14);
            this.map.setCenter(this.getPosition());
          });

          this.markers.push(marker);
        })
      );
  }
}
