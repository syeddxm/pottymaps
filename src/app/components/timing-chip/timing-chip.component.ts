import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timing-chip',
  templateUrl: './timing-chip.component.html',
  styleUrls: ['./timing-chip.component.scss'],
})
export class TimingChipComponent implements OnInit {

  @Input () timing: any;

  timeText = '';
  open = false;

  constructor() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {

    let openTime = this.timing.open;
    let closeTime = this.timing.close;

    const now = new Date();

    openTime = openTime.toDate();
    closeTime = closeTime.toDate();

    if (now.toTimeString() > openTime.toTimeString() && now.toTimeString() < closeTime.toTimeString()) {
      this.timeText =  'Open Until ' + this.convertToHours(closeTime);
      this.open = true;
    } else if (now.toTimeString() < openTime.toTimeString()) {
      this.timeText = 'Opening At ' + this.convertToHours(openTime);
    } else {
      this.timeText = 'Closed Today';
    }
  }

  convertToHours(t) {
    let tempT;
    if (t.getHours() > 12) {
      tempT = t.getHours() - 12 + ':' + t.getMinutes() + ' PM';
    } else {
      tempT = t.getHours() + ':' + t.getMinutes() + ' AM';
    }
    return tempT;
  }

  ngOnInit() {}

}
