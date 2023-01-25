import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects'
})

export class FilterProjectsPipe implements PipeTransform {
  transform(items: any[], name: string): any {
    if (!items || !name) {
        return items;
    }
    return items.filter(item => item.attributes.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 );
  }
}
