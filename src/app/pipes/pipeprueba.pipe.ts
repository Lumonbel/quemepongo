import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeprueba'
})
export class PipepruebaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
