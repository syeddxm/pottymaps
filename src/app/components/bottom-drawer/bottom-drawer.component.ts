import { Component, OnInit, Input, ViewChild, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { GeofireService } from '../../services/geofire.service';
import { Router } from '@angular/router';

import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-bottom-drawer',
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.scss'],
})
export class BottomDrawerComponent implements OnInit {

  @ViewChild('mainSlides', { static: true}) mainSlides: IonSlides;

  @Input() index: any;
  @Input() locations: any[];

  @Output() indexChangedEvent: EventEmitter<any> = new EventEmitter<any>();


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: false,
    slidesPerView: 1.5,
    centeredSlides: true,
  };

  slideOptsMobile = {
    initialSlide: 0,
    speed: 400,
    pagination: false,
    slidesPerView: 1.2,
    centeredSlides: true,
  };

  constructor(private router: Router, public plt: Platform) {
  }


  slideChanged() {
    this.mainSlides.getActiveIndex().then(index => {
      this.indexChangedEvent.emit({index});
    });
  }



  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {

    // tslint:disable-next-line:no-string-literal
    if (changes['index']) {
        this.mainSlides.slideTo(this.index);
    }

  }

  ngOnInit() {}

}
