import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() locations: any[];
  @Input() geolocation: boolean;

  constructor() {
  }

  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    console.log(this.locations);
  }

}
