import { Component, Inject, OnInit } from '@angular/core';
import { LocationProvider } from '@rupeez/location-provider';
import { Place } from '@rupeez/place';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'rupeez-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent implements OnInit {

  places: Observable<Array<Place>>;
  position: Observable<{ longitude: number, latitude: number }>;

  constructor(
    @Inject('LocationProvider')
    private locationProvider: LocationProvider) { }

  ngOnInit() {
    this.places = this.locationProvider.getNearby('atm');
    this.position = this.locationProvider.getCurrentPosition();
  }

  onPlaceClick(place: Place) {
    console.log('clicked:', place);
  }
}
