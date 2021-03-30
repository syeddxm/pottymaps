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

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {

    let openTime = this.timing.open;
    let closeTime = this.timing.close;

    const now = new Date();

    if (openTime && closeTime) {
      openTime = openTime.toDate();
      closeTime = closeTime.toDate();

      if (now.toTimeString() > openTime.toTimeString() && now.toTimeString() < closeTime.toTimeString()) {
        this.timeText =  'Open Until ' + this.convertToHours(closeTime);
        this.open = true;
      } else if (now.toTimeString() < openTime.toTimeString()) {
        this.timeText = 'Opening At ' + this.convertToHours(openTime);
      } else {
        this.timeText = 'Closed';
      }
    } else {
      this.timeText = 'Closed';
    }
  }

  convertToHours(t) {
    let tempH;
    let tempM;


    if (t.getMinutes() < 10) {
      tempM = '0' + t.getMinutes();
    } else {
      tempM = t.getMinutes();
    }

    if (t.getHours() > 12) {
      tempH = t.getHours() - 12 + ':' + tempM + ' PM';

    } else {
      tempH = t.getHours() + ':' + tempM + ' AM';

    }


    return tempH;
  }

  ngOnInit() {}

}
