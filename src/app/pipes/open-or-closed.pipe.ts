import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openOrClosed'
})
export class OpenOrClosedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return 'Closed';
    }
    return value;
  }

}
