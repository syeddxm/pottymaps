import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  gpsPosition: any;
  pinPosition: any;
  trackingUser: any;
  locations = [];
  index = 0;

  listView = false;

  constructor(public geo: GeoService) {
    this.gpsPosition = this.geo.getGpsPosition;
    this.pinPosition = this.geo.getSearchPinLocation;
    this.locations = this.geo.getBathroomLocations;
    this.trackingUser = this.geo.getTrackingUser;
  }

  newIndex(event) {
    this.index = event.index;
  }

  toggleView() {
    this.listView = !this.listView;
  }

  ionViewWillEnter() {
    console.log('view entered');
  }

  ngOnChange() {
    this.trackingUser.next(() => {
      console.log(this.trackingUser);
    });


  }

  ngOnInit() {
  }

}
