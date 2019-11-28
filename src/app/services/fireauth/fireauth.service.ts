import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from '../../models/user/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionReference } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

userData: User; // Save logged in user data
firestore = firebase.firestore();
auth = firebase.auth;
authState: BehaviorSubject<boolean> = new BehaviorSubject(false);
usercollection: CollectionReference;


constructor() {
  /* Saving user data in localstorage when
  logged in and setting up null when logged out */
  this.auth().onAuthStateChanged( user => {
    if (user) {
      this.currentUser(user).then(() => {
        this.authState.next(true);
      });
    } else {
      this.userData = null;
      this.authState.next(false);
    }
  });

  this.usercollection = this.firestore.collection('users');

}

//  OAuth
GoogleAuth() {
  return this.AuthLogin(new this.auth.GoogleAuthProvider());
}

// Email Sign Up
signUpWithEmail(email, password, name) {
  return this.auth().createUserWithEmailAndPassword(email, password)
  .then( (result) => {
    result.user.updateProfile({displayName: name}).then( () => {
      this.setUserData(result.user);
    });
  });
}

// Email Sign In
signInWithEmail(email, password) {
  return this.auth().signInWithEmailAndPassword(email, password);
}

// Auth logic to run auth providers
AuthLogin(provider) {
  return this.auth().signInWithPopup(provider)
  .then((result) => {
    this.setUserData(result.user);
  }).catch((error) => {
    window.alert(error);
  });
}

// Log out
logOut() {
  this.auth().signOut();
}

// reset password
resetPassword(email: string): Promise<void> {
  return this.auth().sendPasswordResetEmail(email);
}

setUserData(user) {
  const userRef = this.usercollection.doc(user.uid);
  const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    favourites: []
  };

  this.userData = {...userData};
  return userRef.set(userData, {
    merge: true
  });
}

// GETTING USER DATA

currentUser(user): Promise<void> {
  console.log('saving user');
  return new Promise( (resolve, reject) => {
    this.usercollection.doc(user.uid).get().then((u) => {
      this.userData = {
        uid: u.data().uid,
        email: u.data().email,
        displayName: u.data().displayName,
        photoURL: u.data().photoURL,
        emailVerified: u.data().emailVerified,
        favourites: u.data().favourites
      };
      resolve();
    });
  });
}

toggleFavourite(id) {

}

get getUserInformation() {
  return this.userData;
}

get getUserFavourites() {
  return this.userData.favourites;
}

loggedIn(): Observable<boolean> {
  return this.authState;
}

}
