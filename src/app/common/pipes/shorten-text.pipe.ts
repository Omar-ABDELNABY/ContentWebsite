import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, limit: number): any {
    if (!value){
      return null;
    }
    let actualLimit = limit? limit : 50;
    if (value.length < actualLimit){
      return value;
    }
    return value.substring(0,actualLimit) + ' ...';
  }
}
