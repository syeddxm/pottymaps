import { Component, OnInit } from '@angular/core';
import { Bathroom } from 'src/app/models/bathroom';
import { GeoService } from 'src/app/services/geo.service';
import { FireauthService } from 'src/app/services/fireauth/fireauth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  favourites: string[];
  favouritesObjects: any[] = [];
  noFavourites = true;

  constructor(private geoService: GeoService, private authService: FireauthService) {
    this.favourites = [];

    this.getFavourites();
  }

  ngOnInit() {

  }

  getFavourites() {
    if (this.authService.getUserInformation) {
      this.favourites = this.authService.getUserFavourites;
      this.getFavouriteLocationInfo();

    } else {
      this.authService.loggedIn().subscribe( u => {
        if (u) {
          this.favourites = this.authService.getUserFavourites;
          this.getFavouriteLocationInfo();
        } else {
          this.favourites = [];
        }
      });
    }

  }

  getFavouriteLocationInfo() {
    console.log(this.favourites);

    for (const id of this.favourites) {
      this.geoService.getLocationById(id)
      .then((loc) => {
        if (loc.data.exists) {
          this.favouritesObjects.push(loc);
          this.noFavourites = false;
        }
        console.log(this.noFavourites);

      }).catch(() => {
        console.log('no favs');
      });
    }

  }

}
