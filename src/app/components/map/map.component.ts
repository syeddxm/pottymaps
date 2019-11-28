import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeoService } from 'src/app/services/geo.service';
import { ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() gpsPositionLat: any;
  @Input() gpsPositionLng: any;

  @Input() pinPositionLat: any;
  @Input() pinPositionLng: any;

  @Input() pinPosition: any;

  @Input() trackingUser: any;

  @Input() locations: any[];
  @Input() index: any;

  @Output() indexChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  mapCenter = {latitude: 0, longitude: 0};
  tempCenter = {lat: 0, lng: 0};
  height = 0;

  constructor(public platform: Platform, public geo: GeoService, private ngZone: NgZone, private cd: ChangeDetectorRef   ) {
    this.height = platform.height();

  }

  locationClicked(index) {
    const locTemp = this.locations[index].data();
    this.mapCenter.latitude = locTemp.coordinates.latitude;
    this.mapCenter.longitude = locTemp.coordinates.longitude;
    this.indexChangedEvent.emit({index});
  }

  mapDragging(event) {
    this.tempCenter.lat = event.lat;
    this.tempCenter.lng = event.lng;
  }

  mapDragEnd() {
    this.mapCenter.latitude = this.tempCenter.lat;
    this.mapCenter.longitude = this.tempCenter.lng;
  }

  returnToUser() {
    this.mapCenter.latitude = this.gpsPositionLat;
    this.mapCenter.longitude = this.gpsPositionLng;

    this.geo.returnToUser();

  }

  returnToPin() {
    this.mapCenter.latitude = this.pinPositionLat;
    this.mapCenter.longitude = this.pinPositionLng;
  }

  addLocation() {
    // this.geo.addLocation(this.userLatitude, this.userLongitude);
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {

    // tslint:disable-next-line:no-string-literal
    if (changes['gpsPositionLat']) {
    // tslint:disable-next-line:no-string-literal
      if (!changes['gpsPositionLat'].isFirstChange()) {
        this.returnToUser();
      }
    }

    // tslint:disable-next-line:no-string-literal
    if (changes['pinPositionLat']) {
      // tslint:disable-next-line:no-string-literal
      if (!changes['pinPositionLat'].isFirstChange()) {
        this.returnToPin();

      }
    }

    // tslint:disable-next-line:no-string-literal
    if (changes['trackingUser']) {
      // tslint:disable-next-line:no-string-literal
      if (!changes['trackingUser'].isFirstChange()) {
        if (this.trackingUser === true) {
          this.returnToUser();
        }

      }
    }


    // tslint:disable-next-line:no-string-literal
    if (changes['index']) {
    // tslint:disable-next-line:no-string-literal
      if (!changes['index'].isFirstChange()) {
        const locTemp = this.locations[this.index].data();

        // CHANGE MAP CENTER
        this.mapCenter.latitude = locTemp.coordinates.latitude;
        this.mapCenter.longitude = locTemp.coordinates.longitude;
      }
    }
  }
  ngOnInit() {}
}
