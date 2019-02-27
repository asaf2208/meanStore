import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayUsd'
})
export class DisplayUsdPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return '$' + value;
  }

}
