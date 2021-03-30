import { Injectable, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

declare var google: any;


@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  // GeoCoder
  geocoder: any;
  // Google Geo Auto Complete Service
  autocompleteService: any;
  // Google Places Services
  placesService: any;
  // Search Suggestions to an empty array
  searchSuggestions: any = [];
  // Search Pin Location
  searchPinLocation = {lat: null, lng: null};
  // Initialize Tracking User to true
  trackingUser = true;

  constructor(
    private mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
  ) {
    // Load the maps API and initialize the different services
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    });
  }

  searchbarSuggestion(query) {
    return new Promise( (resolve, reject) => {
      if (query.length > 0) {
        console.log(query);
        const config = {
            types: ['geocode'],
            input: query
        };
        this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                this.searchSuggestions = [];
                predictions.forEach((prediction) => {
                    this.searchSuggestions.push(prediction);
                });
                resolve();
            }
        });
      } else {
          this.searchSuggestions = [];
      }
    });
  }

  getAddress(lat, lng) {
    const latlng = new google.maps.LatLng(lat, lng);

    return new Promise( (resolve, reject) => {
      this.geocoder.geocode(
        {latLng: latlng},
         (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                resolve (results[0].formatted_address);
              } else {
                return 'address not found';
              }
            } else {
              return 'Geocoder failed due to:' + + status;
            }
        }
      );
    });
  }

  searchBarSelect(place) {
    const location = {
        lat: null,
        lng: null,
        name: place.name
    };

    this.zone.run(() => { this.placesService.getDetails({placeId: place.place_id}, (details) => {
        console.log(details);
        this.searchPinLocation.lat = details.geometry.location.lat();
        this.searchPinLocation.lng = details.geometry.location.lng();
        this.searchSuggestions = [];
        this.trackingUser = false;
        // this.findLocations(this.userLocation);
      });
    });
  }

  returnToUser() {
    this.searchPinLocation.lat = null;
    this.searchPinLocation.lng = null;
    this.trackingUser = true;
  }

  get getTrackingUser() {
    return this.trackingUser;
  }

  get getSearchPinLocation() {
    return this.searchPinLocation;
  }

  get getSearchSuggestions() {
    return this.searchSuggestions;
  }
}
