import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot, GeoFirestoreTypes } from 'geofirestore';
import { Platform } from '@ionic/angular';
import { Bathroom } from '../models/bathroom';
import { DocumentData } from '@google-cloud/firestore';
import { CollectionReference, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Review } from '../models/review';
import { FireauthService } from './fireauth.service';
import { GoogleMapService } from './google-map.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeofireService {

  constructor(
    plt: Platform,
    private fireauthService: FireauthService,
    private googleMapService: GoogleMapService) {

    // Create a Firestore reference
    const firestore = firebase.firestore();

    // // Create a GeoFirestore reference
    const geofirestore: GeoFirestore = new GeoFirestore(firestore);

    // Create a GeoCollection reference
    this.geocollection = geofirestore.collection('locations');
    this.locationscollection = firestore.collection('locations');
    this.reviewscollection = firestore.collection('reviews');
    this.usercollection = firestore.collection('users');

    // Find the users Location
    this.findUserLocation();
  }

  get getReviews() {
    return this.reviews;
  }

  get getGpsPosition() {
    return this.gpsLocation;
  }

  get getBathroomLocations() {
    return this.locations;
  }

  // Firebase Collection References
  geocollection: GeoCollectionReference;
  locationscollection: CollectionReference;
  reviewscollection: CollectionReference;
  usercollection: CollectionReference;

  // GPS Location Coordinates
  gpsLocation = {lat: null, lng: null};

  // Selected Location: The location a user has currently selected
  selectedLocation: any;

  // reviews
  reviews: any[] = [];

  // Initialize Bathroom locations array to empty
  locationSubject = new Subject<any[]>();
  locations: GeoFirestoreTypes.QueryDocumentSnapshot[] = [];
  preSortLocations: GeoFirestoreTypes.QueryDocumentSnapshot[] = [];
  reviewsSubject = new Subject<any[]>();

  // Sort Options
  sortOptions = {
    favourite: false,
    open: false,
    changingTable: false,
    genderNeutral: false,
    wheelchair: false
  };

  lastVisibleReview: QueryDocumentSnapshot<any>;

  // Finds the user's location based on the navigator geolocation service
  findUserLocation() {
    if (navigator.geolocation) {
      // Watch the user's position as it changes
      navigator.geolocation.getCurrentPosition((p) => {

        // Set the GPS location
        this.gpsLocation.lng =  p.coords.longitude;
        this.gpsLocation.lat = p.coords.latitude;

        // Find bathrooms based on the GPS location
        this.findLocations(this.gpsLocation);
      });
    }

  }

  // Find the bathroom locations using GeoFirestore and a lat long location
  findLocations(location) {

    // Create a GeoQuery based on a location
    const query: GeoQuery = this.geocollection.near({ center: new firebase.firestore.GeoPoint(location.lat, location.lng), radius: 1000 });

    // Get query (as Promise)
    query.onSnapshot((value: GeoQuerySnapshot) => {
      // Store locations
      // value.docs.forEach((doc) => {
      //   this.locations.push(doc);
      // });

      this.locations = value.docs;

      console.log(this.locations);

      // Sort locations
      this.locations.sort((a, b) => a.distance - b.distance);
      this.preSortLocations = this.locations;
      this.sortLocations();
    });
  }

  sortLocations() {

    const now = new Date();
    const day = now.getUTCDay();

    let sorted = [];

    sorted = this.preSortLocations;

    if (this.sortOptions.open) {
      sorted = sorted.filter((loc) => {
        const timing = loc.data().timing[day];
        if (timing.open && timing.close) {
          const openTime = timing.open.toDate();
          const closeTime = timing.close.toDate();

          if (now.toTimeString() > openTime.toTimeString() && now.toTimeString() < closeTime.toTimeString()) {
            return loc;
          }
        }

      });
    }

    if (this.sortOptions.favourite) {
      const favs  = this.fireauthService.getUserFavourites;
      sorted = sorted.filter((loc) => {
        if (favs.indexOf(loc.id) >= 0) {
          console.log(loc.id);
          return loc;
        }
      });
    }

    if (this.sortOptions.changingTable) {

      sorted = sorted.filter((loc) => {
        if (loc.data().changingTable) {
          return loc;
        }
      });
    }

    if (this.sortOptions.genderNeutral) {

      sorted = sorted.filter((loc) => {
        if (loc.data().genderNeutral) {
          return loc;
        }
      });
    }

    if (this.sortOptions.wheelchair) {

      sorted = sorted.filter((loc) => {
        if (loc.data().wheelchairAccess) {
          return loc;
        }
      });
    }
    console.log(this.sortOptions);
    this.locations = sorted;
    this.locationSubject.next();

  }

  // Adds a location to the Firestore database
  // It takes latitude, longitude and a bathroom location object
  addLocation(lat, lng, bathroom: Bathroom, review: Review) {

    return new Promise( (resolve, reject) => {

      // Convert lat and long into GeoPoint
      const point = new firebase.firestore.GeoPoint(lat, lng);

      // Get the address using the google map service
      this.googleMapService.getAddress(lat, lng).then( addr => {
        bathroom.address = addr;
        bathroom.coordinates = point;
        bathroom.submittedby = this.fireauthService.userData.uid;

        const loc: DocumentData =  {...bathroom};

        // Add location to the GeoCollection
        this.geocollection.add(loc).then(docRef => {
          // Submit first review
          const review1 = new Review();
          review1.userId = this.fireauthService.userData.uid;
          const reviews = this.locationscollection.doc(docRef.id).collection('reviews');
          reviews.add({...review});
        });
      });
    });
  }

  addReview(id, rev) {
    const review = new Review();

    review.rating = rev.rating;
    review.userId = this.fireauthService.userData.uid;
    review.description = rev.description;
    review.title = rev.title;

    const reviews = this.locationscollection.doc(id).collection('reviews');
    reviews.add({...review});

  }

  // Get 1(one) full location using ID
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

  // Get 1(one) full location data using ID
  getLocationData(id) {
    if (id) {
      return new Promise( (resolve, reject) => {
        this.locationscollection.doc(id).get()
        .then(location => {
          this.selectedLocation = location.data().d;
          resolve (location.data().d);
        });
      });
    }
  }


  getLocationReviews(id) {


    if (id) {
      return new Promise( (resolve, reject) => {
          this.locationscollection.doc(id)
          .collection('reviews')
          .orderBy('submitted')
          .onSnapshot((review) => {
            console.log(review);
            // this.lastVisibleReview = review.docs[review.docs.length - 1];

            this.reviews = review.docs;

            this.reviewsSubject.next();
          });
      });
    }
  }
}
