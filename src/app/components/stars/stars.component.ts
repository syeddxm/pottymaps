import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  @Input() rating: number;

  ratingArray: number[] = [];

  constructor() {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:no-string-literal
    if (changes['rating']) {
    // tslint:disable-next-line:no-string-literal
      this.updateRatingArray();
    }
  }

  updateRatingArray() {
    this.ratingArray = [];
    for (let i = 0; i < 5; i++) {
      if (this.rating - i >= 1) {
        this.ratingArray.push(2);
      } else if (this.rating - i < 1 && this.rating - i >= 0.5) {
        this.ratingArray.push(1);
      } else {
        this.ratingArray.push(0);
      }
    }
  }

  ngOnInit() {}

}
