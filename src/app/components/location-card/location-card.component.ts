import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '../../services/fireauth.service';
import { GeofireService } from '../../services/geofire.service';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit {

  @Input() location: any;
  @Input() geolocation: boolean;

  day = 0;
  today;

  favourited: boolean;

  loggedIn = false;


  constructor(private router: Router, private fireAuth: FireauthService, private geoService: GeofireService) {
    this.today = new Date();
    this.day = this.today.getDay();

    this.fireAuth.loggedIn().subscribe((v) => {
      this.loggedIn = v;

      if (v && this.location) {
        const favs = this.fireAuth.getUserFavourites;
        this.favourited = favs.includes(this.location.id);

        console.log(v);

      }
    });

    this.fireAuth.userDataSubscribe.subscribe( () => {
      const favs = this.fireAuth.getUserFavourites;
      this.favourited = favs.includes(this.location.id);
      console.log('userdatasub');
    });
  }

  ngOnInit() {}

  openBathroom(location) {
    this.router.navigate(['/bathroom', location.id  ]);
  }

    // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {

  }

  toggleFavourite(e) {
    e.stopPropagation();
    this.fireAuth.loggedIn().subscribe((u) => {
      if (u) {
        this.fireAuth.toggleFavourite(this.location.id);
        if (this.geoService.sortOptions.favourite) {
          this.geoService.sortLocations();
        }
      } else {
        console.log('sign in to favourite locations');
      }
    });
  }

}
