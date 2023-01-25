import { Component, Input } from '@angular/core';
import { Included } from 'src/app/models/included.model';
import { PropertiesHelper } from 'src/app/helpers/properties.helper';

@Component({
  selector: 'app-project-properties',
  templateUrl: './project-properties.component.html',
  styleUrls: ['./project-properties.component.sass']
})
export class ProjectPropertiesComponent {

  properties: any;
  displayedColumns: string[] = ['property', 'value'];

  constructor(
    private propertiesHelper: PropertiesHelper,
  ) { }

  @Input()
  set objectIncluded(objectIncluded: Included[]) {
    this.properties = this.propertiesHelper.getProjectsProperties(objectIncluded);
  }
}
