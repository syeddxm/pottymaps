import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@google-cloud/firestore';

@Pipe({
  name: 'toHourAndMinutes'
})
export class ToHourAndMinutesPipe implements PipeTransform {

  transform(value: Timestamp, args?: any): any {
    const date = value.toDate();

    let time = '';

    if (date.getHours() > 12) {
      time = date.getHours() - 12 + ':' + date.getMinutes() + ' PM';
    } else {
      time = date.getHours() + ':' + date.getMinutes() + ' AM';
    }


    return time;
  }

}
