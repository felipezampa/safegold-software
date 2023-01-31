import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCase'
})
export class UppercasePipePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value)
      return value.toUpperCase();
    else
      return "";  
  }

}
