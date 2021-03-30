import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-submit-map',
  templateUrl: './submit-map.component.html',
  styleUrls: ['./submit-map.component.scss'],
})
export class SubmitMapComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  mapCenter = {
    lat: 0,
    lng: 0
  };

  constructor() {}

  mapClick(e) {
  }

  ngOnInit() {}

}
