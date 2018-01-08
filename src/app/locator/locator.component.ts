import { Component, ElementRef, Inject, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Observable';

declare var google;

@Component({
  selector: 'rupeez-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent implements OnInit {

  places: Observable<Array<Place>>;
  position: Observable<Place>;

  @ViewChild('gmap', { read: ElementRef }) gmap: ElementRef;

  constructor(
    @Inject('LocationProvider')
    private locationProvider: LocationProvider,

    private el: ElementRef,
    private renderer: Renderer2) { }

  private map;

  ngOnInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, { zoom: 12 });

    this.locationProvider
      .getCurrentPosition()
      .subscribe((place: Place) => {
        this.map.setCenter({ lat: place.latitude, lng: place.longitude });
      });

    this.locationProvider
      .getNearby('atm')
      .subscribe((places: Array<Place>) =>
        places.map((place: Place) => new google.maps.Marker({
          position: { lat: place.latitude, lng: place.longitude },
          map: this.map
        }).addListener('click', function () {
          this.map.setZoom(14);
          this.map.setCenter(this.getPosition());
        })));
  }
}
