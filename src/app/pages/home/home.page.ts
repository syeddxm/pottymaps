import { Component, OnInit } from '@angular/core';
import { GeofireService } from '../../services/geofire.service';
import { SubmitService } from '../../services/submit.service';
import { GoogleMapService } from 'src/app/services/google-map.service';

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

  submitMode = false;

  listView = false;

  constructor(private geofireService: GeofireService, private googleMapService: GoogleMapService, private submitService: SubmitService) {
    this.gpsPosition = this.geofireService.getGpsPosition;
    this.pinPosition = this.googleMapService.getSearchPinLocation;

    this.geofireService.locationSubject.subscribe(() => {

      this.locations = this.geofireService.getBathroomLocations;
      console.log(this.locations);
    });

    this.trackingUser = this.googleMapService.getTrackingUser;

    this.submitService.submitMode.subscribe((submitMode) => {
      this.submitMode = submitMode;
      console.log(this.submitMode);
    });
  }

  newIndex(event) {
    this.index = event.index;
  }

  toggleView() {
    this.listView = !this.listView;
  }

  ionViewWillEnter() {
    this.submitService.disableSubmitMode();
    this.gpsPosition = this.geofireService.getGpsPosition;
  }

  ngOnChange() {
    this.trackingUser.next(() => {
      console.log(this.trackingUser);
    });

  }

  ngOnInit() {
  }

}
