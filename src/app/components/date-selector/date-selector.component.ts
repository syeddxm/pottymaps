import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OpenClose } from '../../models/bathroom';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent implements OnInit {

  @Input() day: OpenClose;

  @Output() OpenClose: EventEmitter<any> = new EventEmitter<any>();
  open;
  close;

  hours = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23];
  minutes = [0, 15, 30, 45];
  constructor() { }

  openingTime() {
    const date = new Date(this.open);
    this.day.open = date;


    if (this.close) {
      this.OpenClose.emit(this.day);
    }
  }

  closingTime() {
    const date = new Date(this.close);
    this.day.close = date;

    if (this.open) {
      this.OpenClose.emit(this.day);
    }
  }

  closed() {
    this.open = null;
    this.close = null;

    this.day.close = null;
    this.day.open = null;
    this.OpenClose.emit(this.day);
  }

  ngOnInit() {}

}
