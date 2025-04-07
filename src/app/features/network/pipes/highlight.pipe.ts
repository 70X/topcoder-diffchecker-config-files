import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args || !value) {
      return value;
    }
    const pattern = args.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const re = new RegExp(pattern, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, '<mark>$&</mark>');
  }
}
