import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// FIREBASE
import * as environment from '../environments/environment';
import * as firebase from 'firebase';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule, ClusterManager } from '@agm/js-marker-clusterer';

import { ComponentsModule } from './components/components.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey,
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ClusterManager,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
