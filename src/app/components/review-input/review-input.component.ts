import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/review';
import { GeofireService } from 'src/app/services/geofire.service';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.scss'],
})
export class ReviewInputComponent implements OnInit {

  @Input() id: number;

  review = new Review();

  constructor(private geoService: GeofireService) { }

  ngOnInit() {}


  starClickedOutput(event) {
    this.review.rating = event;
  }

  reviewSubmitted() {
    this.geoService.addReview(this.id, this.review);
  }

}
