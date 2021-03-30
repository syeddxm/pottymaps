import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {

  @Output() starClickedOutput: EventEmitter<any> = new EventEmitter();

  ratingArray: number[] = [0, 0, 0, 0, 0];

  constructor() { }

  starClicked(i) {
    console.log(i);
    switch (i) {
      case 0:
        this.ratingArray = [2, 0, 0, 0, 0];
        break;
      case 1:
        this.ratingArray = [2, 2, 0, 0, 0];
        break;
      case 2:
        this.ratingArray = [2, 2, 2, 0, 0];
        break;
      case 3:
        this.ratingArray = [2, 2, 2, 2, 0];
        break;
      case 4:
        this.ratingArray = [2, 2, 2, 2, 2];
        break;
    }
    this.starClickedOutput.emit(i + 1);
  }

  ngOnInit() {}

}
