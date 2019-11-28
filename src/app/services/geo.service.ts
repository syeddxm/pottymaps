import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { Platform } from '@ionic/angular';
import { Bathroom } from '../models/bathroom';
import { DocumentData } from '@google-cloud/firestore';
import { CollectionReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Review } from '../models/review';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  gpsLocation = {lat: null, lng: null};
  userLocation = {lat: null, lng: null};
  searchPinLocation = {lat: null, lng: null};
  geocollection: GeoCollectionReference;
  locationscollection: CollectionReference;
  reviewscollection: CollectionReference;
  usercollection: CollectionReference;

  selectedLocation;


  geocoder: any;
  autocompleteService: any;
  placesService: any;
  trackingUser = true;

  locations = [];
  searchSuggestions: any = [];

  constructor(plt: Platform, private mapsApiLoader: MapsAPILoader,  private zone: NgZone) {

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    });

    // Create a Firestore reference
    const firestore = firebase.firestore();

    // // Create a GeoFirestore reference
    const geofirestore: GeoFirestore = new GeoFirestore(firestore);

    // Create a GeoCollection reference
    this.geocollection = geofirestore.collection('locations');
    this.locationscollection = firestore.collection('locations');
    this.reviewscollection = firestore.collection('reviews');
    this.usercollection = firestore.collection('users');

    this.findUserLocation();
  }


  findUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        this.gpsLocation.lng =  p.coords.longitude;
        this.gpsLocation.lat = p.coords.latitude;

        this.findLocations(this.gpsLocation);
      });
    }

  }

  findLocations(location) {

    // Create a GeoQuery based on a location
    const query: GeoQuery = this.geocollection.near({ center: new firebase.firestore.GeoPoint(location.lat, location.lng), radius: 1000 });

    // Get query (as Promise)
    query.get().then((value: GeoQuerySnapshot) => {
      this.locations.splice(0, this.locations.length);
      value.docs.forEach((doc) => {
        console.log(doc);
        console.log(doc.data());
        this.locations.push(doc);
      });

      this.locations.sort((a, b) => {
        if (a.distance < b.distance) {
          return -1;
        } else if (a.distance > b.distance) {
          return 1;
        } else {
          return 0;
        }
      });
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

  addLocation(lat, lng) {
    const point = new firebase.firestore.GeoPoint(lat, lng);
    const bathroom = new Bathroom();

    this.getAddress(lat, lng).then( addr => {
      bathroom.address = addr;
      bathroom.coordinates = point;
      bathroom.average = 3.5;

      let loc: DocumentData = {};

      loc =  {...bathroom};

      this.geocollection.add(loc).then(docRef => {
        const review = new Review();

        const reviews = this.locationscollection.doc(docRef.id).collection('reviews');
        reviews.add({...review});
      });
    });
  }

  getLocationById(id): DocumentData {
    return new Promise( (resolve, reject) => {
      this.locationscollection.doc(id).get()
      .then(location => {
        console.log(location.data());
        resolve ({id, data: location});
      }).catch(() => {
        reject ();
      });
    });
  }

  getLocationData(id) {

    return new Promise( (resolve, reject) => {
      this.locationscollection.doc(id).get().then(location => {
        this.selectedLocation = location.data().d;
        resolve (location.data().d);
      });
    });
  }

  getLocationReviews() {

    const reviews = [];

    for (const review of this.selectedLocation.reviews) {
      this.reviewscollection.doc(review).get().then(data => {
        console.log(data.data().userid);
        this.usercollection.doc(data.data().userid).get().then(user => {
          const reviewWithUserName = {data: data.data(), name: user.data().displayName};
          reviews.push(reviewWithUserName);
        });
      });
    }
    return reviews;
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

  get getSearchSuggestions() {
    return this.searchSuggestions;
  }

  get getTrackingUser() {
    return this.trackingUser;
  }

  get getSearchPinLocation() {
    return this.searchPinLocation;
  }

  get getGpsPosition() {
    return this.gpsLocation;

  }

  get getBathroomLocations() {
    return this.locations;
  }


}
