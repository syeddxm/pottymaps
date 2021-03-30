import { Component, OnInit, Input } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Bathroom } from 'src/app/models/bathroom';
import { GeofireService } from '../../services/geofire.service';
import { Router } from '@angular/router';
import { SubmitService } from '../../services/submit.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss'],
})
export class SubmitFormComponent implements OnInit {

  private todo: FormGroup;

  @Input() lat;
  @Input() lng;

  sundayTim;

  review;

  newLocation = new Bathroom();

  constructor(
    private formBuilder: FormBuilder,
    private geoService: GeofireService,
    private submitService: SubmitService,
    private router: Router) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });

    console.log(this.newLocation);
  }

  getTimings(day, i) {
    console.log(day);
    this.newLocation.timing[i] = day;
  }

  reviewUpdated(event) {
    this.review = event.review;
    console.log(this.review);
  }

  logForm() {

    this.geoService.addLocation(this.lat, this.lng, this.newLocation, this.review).then(() => {
      console.log('go to home');

    });
    this.submitService.disableSubmitMode();
    this.router.navigate(['/home']);
  }

  ngOnInit() {}

}
