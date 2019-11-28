import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.page.html',
  styleUrls: ['./bathroom.page.scss'],
})
export class BathroomPage implements OnInit {

  data;
  day = 0;
  today;
  reviews = [];

  constructor(private route: ActivatedRoute, private geoService: GeoService) {
    this.today = new Date();
    this.day = this.today.getDay();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.geoService.getLocationData(params.id).then(a => {
        this.data = {...a};
      }).then(() => {
        this.reviews = this.geoService.getLocationReviews();
      });

    });
  }

}
