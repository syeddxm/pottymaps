import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit'
})
export class ConvertUnitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value > 1) {
      return value.toFixed(2) + ' km';
    } else {
      return (value * 1000).toFixed(0)  + ' m';
    }
  }

}
