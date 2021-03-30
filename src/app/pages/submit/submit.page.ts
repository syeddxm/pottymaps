import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmitService } from 'src/app/services/submit.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute, submitService: SubmitService) {
    this.lat = submitService.submitPosition.lat;
    this.lng = submitService.submitPosition.lng;
  }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   console.log(params);
    //   this.lat = parseFloat(params.lat);
    //   this.lng = parseFloat(params.lng);
    // });
  }

}
