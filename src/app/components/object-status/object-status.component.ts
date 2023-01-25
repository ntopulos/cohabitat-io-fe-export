import { Component, Input } from '@angular/core';
import { Included } from 'src/app/models/included.model';

@Component({
  selector: 'app-object-status',
  templateUrl: './object-status.component.html',
  styleUrls: ['./object-status.component.sass']
})
export class ObjectStatusComponent {

  public statusDescriptions;

  @Input()
  set objectIncluded(objectIncluded: Included[]) {
    let statusId = objectIncluded.find(x => x.type === 'object-statuses').id
    this.statusDescriptions = objectIncluded
      .filter(x => x.type === 'object-statuses-descriptions')
      .filter(x => x.id === statusId);
    // TODO add multilanguage support (as for now the first language is displayed)
  }
}
