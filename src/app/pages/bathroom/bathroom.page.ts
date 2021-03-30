import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GeofireService } from '../../services/geofire.service';
import { Review } from 'src/app/models/review';
import { Bathroom } from 'src/app/models/bathroom';
import { SubmitService } from 'src/app/services/submit.service';

@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.page.html',
  styleUrls: ['./bathroom.page.scss'],
})
export class BathroomPage implements OnInit {


  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;


  data;
  day = 0;
  today;
  reviews = [];

  id;

  review = new Review();

  constructor(private route: ActivatedRoute, private geoService: GeofireService) {
    this.today = new Date();
    this.day = this.today.getDay();

    this.geoService.reviewsSubject.subscribe(() => {
      this.reviews = this.geoService.getReviews;
    });
  }

  loadData(event) {
    // console.log(this.reviews);
    // this.geoService.getLocationReviews(this.id).then(() => {
    //   this.reviews = this.geoService.getReviews;
    // });
    // event.target.complete();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.geoService.getLocationData(params.id).then( (a: Bathroom) => {
        this.data = {...a};
      }).then(() => {
        this.geoService.getLocationReviews(params.id).then(() => {
          this.reviews = this.geoService.getReviews;
        });
        console.log(this.reviews);
      });
    });
  }

}
