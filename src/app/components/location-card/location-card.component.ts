import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth/fireauth.service';

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
  userFavs = [];
  favourited: boolean;


  constructor(private router: Router, private fireAuth: FireauthService) {
    this.today = new Date();
    this.day = this.today.getDay();
    this.fireAuth.loggedIn().subscribe((u) => {
      if (u) {
        this.userFavs = this.fireAuth.getUserFavourites;
        this.favourited = this.userFavs.includes(this.location.id);
      }
    });

  }

  ngOnInit() {}

  openBathroom(location) {
    this.router.navigate(['/bathroom', location.id  ]);
  }

    // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    console.log(this.geolocation);
  }

  toggleFavourite(e) {
    e.stopPropagation();
    console.log('fav toggle');
  }

}
