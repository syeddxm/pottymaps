import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@google-cloud/firestore';

@Pipe({
  name: 'dateToTime'
})
export class DateToTimePipe implements PipeTransform {

  transform(value: Timestamp, ...args: any[]): any {
    const date = value.toDate();

    let time = '';

    let hours = '';
    let mins = '';



    if (date.getHours() > 12) {
      console.log(date.getHours() - 12);
      if (date.getHours() - 12 < 10) {
        hours = '0' + (date.getHours() - 12).toString();
      } else {
        hours = (date.getHours() - 12).toString();
      }

      if (date.getMinutes() < 10) {
        mins = '0' + (date.getMinutes()).toString();
      } else {
        mins = (date.getMinutes()).toString();
        console.log(mins);
      }


      time = hours + ':' + mins + ' PM';
    } else {

      if (date.getHours() < 10) {
        hours = '0' + (date.getHours()).toString();
      } else {
        hours = (date.getHours()).toString();
      }

      if (date.getMinutes() < 10) {
        mins = '0' + (date.getMinutes()).toString();
      } else {
        mins = (date.getMinutes()).toString();
      }

      time = hours + ':' + mins + ' AM';
    }
    console.log(time);
    return time;
  }

}
