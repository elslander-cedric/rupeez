import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';
import { } from '@types/googlemaps';

@Component({
  selector: 'rupeez-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent implements OnInit {

  map: google.maps.Map;
  markers = new Array<google.maps.Marker>();

  position: Observable<Place>;
  places: Observable<Array<Place>>;

  @ViewChild('gmap', { read: ElementRef }) gmap: ElementRef;

  constructor(
    @Inject('LocationProvider')
    private locationProvider: LocationProvider,

    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, { zoom: 12 });

    this.locationProvider
      .currentPosition
      .subscribe((place: Place) => {
        this.map.setCenter({ lat: place.latitude, lng: place.longitude });
      });

    this.locationProvider
      .getNearby('atm')
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
