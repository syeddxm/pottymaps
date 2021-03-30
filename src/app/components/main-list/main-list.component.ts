import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent implements OnInit {

  @Input() locations: any[];
  @Input() geolocation: boolean;

  constructor() {
  }

  ngOnInit() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
  }

}
