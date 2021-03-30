import { Component, OnInit, Input } from '@angular/core';
import { FireauthService } from '../../services/fireauth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {

  @Input() review: any;

  userName: string;

  constructor(private fireAuth: FireauthService) {


  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {

    this.fireAuth.getUserName(this.review.data().userId).then((name) => {
      this.userName = name;
    });
  }

  ngOnInit() {
  }

}
