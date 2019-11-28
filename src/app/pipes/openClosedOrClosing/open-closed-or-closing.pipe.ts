import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openClosedOrClosing'
})
export class OpenClosedOrClosingPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let open = value.open;
    let close = value.close;

    const now = new Date();

    now.setHours(15);

    open = open.toDate();
    close = close.toDate();

    if (now.toTimeString() > open.toTimeString() && now.toTimeString() < close.toTimeString()) {
      return 'Open Until ' + convertToHours(close);
    } else if (now.toTimeString() < open.toTimeString()) {
      return 'Closed Until ' + convertToHours(open);
    } else {
      return 'Closed Today';
    }

    function convertToHours(t) {
      let tempT;
      if (t.getHours() > 12) {
        tempT = t.getHours() - 12 + ':' + t.getMinutes() + ' PM';
      } else {
        tempT = t.getHours() + ':' + t.getMinutes() + ' AM';
      }

      return tempT;

    }
  }

}
