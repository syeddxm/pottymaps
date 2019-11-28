import { Component, OnInit, Input, ViewChild, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { GeoService } from 'src/app/services/geo.service';
import { Router } from '@angular/router';

import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
})
export class BottomDrawerComponent implements OnInit {

  @ViewChild('mainSlides') mainSlides: IonSlides;

  @Input() index: any;
  @Input() locations: any[];

  @Output() indexChangedEvent: EventEmitter<any> = new EventEmitter<any>();


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: false
  };




  constructor(private router: Router) {
  }

  slideChanged() {
    this.mainSlides.getActiveIndex().then(index => {
      console.log(index);
      this.indexChangedEvent.emit({index});
    });
  }



  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {

    // tslint:disable-next-line:no-string-literal
    if (changes['index']) {

//      if (this.index !== undefined || this.index !== null) {
        this.mainSlides.slideTo(this.index);
        console.log(this.locations[this.index]);
//      }
    }

  }

  ngOnInit() {}

}
