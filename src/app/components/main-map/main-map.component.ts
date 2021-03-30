import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeofireService } from '../../services/geofire.service';
import { ChangeDetectorRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { SubmitService } from '../../services/submit.service';
import { GoogleMapService } from 'src/app/services/google-map.service';


@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
})
export class MainMapComponent implements OnInit {

  @Input() gpsPositionLat: any;
  @Input() gpsPositionLng: any;

  @Input() pinPositionLat: any;
  @Input() pinPositionLng: any;

  @Input() pinPosition: any;

  @Input() trackingUser: any;

  @Input() locations: any[];
  @Input() index: any;

  @Input() submitMode: boolean;

  @Output() indexChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  mapCenter = {latitude: 0, longitude: 0};
  tempCenter = {lat: 0, lng: 0};
  height = 0;

  bigIcon = {
    url: 'assets/poo_icon.png',
  };

  icon = {
    url: 'assets/poo_icon.png',
    scaledSize: {
      width: 20,
      height: 20
    },
  };

  darkStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          hue: '#ff4400'
        },
        {
          saturation: -100
        },
        {
          lightness: -4
        },
        {
          gamma: 0.72
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon'
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry',
      stylers: [
        {
          hue: '#0077ff'
        },
        {
          gamma: 3.1
        }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        {
          hue: '#000000'
        },
        {
          gamma: 0.44
        },
        {
          saturation: -33
        }
      ]
    },
    {
      featureType: 'poi.park',
      stylers: [
        {
          hue: '#44ff00'
        },
        {
          saturation: -23
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          hue: '#007fff'
        },
        {
          gamma: 0.77
        },
        {
          saturation: 65
        },
        {
          lightness: 99
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          gamma: 0.11
        },
        {
          weight: 5.6
        },
        {
          saturation: 99
        },
        {
          hue: '#0091ff'
        },
        {
          lightness: -86
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          lightness: -48
        },
        {
          hue: '#ff5e00'
        },
        {
          gamma: 1.2
        },
        {
          saturation: -23
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          saturation: -64
        },
        {
          hue: '#ff9100'
        },
        {
          lightness: 16
        },
        {
          gamma: 0.47
        },
        {
          weight: 2.7
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#222222'
        }
      ]
    },
  ];

  cluster = {
    styles: [
      {
        url: 'assets/poo_cluster_icon.png',
        width: 40,
        height: 40,
        textColor: 'white',
      }
    ]
  };

  constructor(
    public platform: Platform,
    public geo: GeofireService,
    public googleMapService: GoogleMapService,
    private submitService: SubmitService) {
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

    this.googleMapService.returnToUser();

  }

  returnToPin() {
    this.mapCenter.latitude = this.pinPositionLat;
    this.mapCenter.longitude = this.pinPositionLng;
  }

  addLocation() {
    // this.geo.addLocation(this.userLatitude, this.userLongitude);
  }

  mapClick(e) {
    if (this.submitMode) {
      console.log(e);
      this.pinPositionLat = e.coords.lat;
      this.pinPositionLng = e.coords.lng;
    }
  }

  submitLocation() {
    this.submitService.submit(this.pinPositionLat, this.pinPositionLng);
  }

  cancelSubmitMode() {
    this.submitService.disableSubmitMode();
  }

  // tslint:disable-next-line:use-lifecycle-interface
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

  mapCalculator(markers, numStyles) {
    let index = 0;
    const count = markers.length;
    let dv: number = count;
    while (dv !== 0) {
      dv = parseInt(String(dv / 10), 10);
      index++;
    }

    index = Math.min(index, numStyles);
    return {
      text: count,
      index
    };
  }


}
