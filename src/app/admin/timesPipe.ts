import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'TimesPipe'})
export class TimesPipe implements PipeTransform {
  transform(value: number): string {
    let newStr: string = value + ' times';
    return newStr;
  }
}
