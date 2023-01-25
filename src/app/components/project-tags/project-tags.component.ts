import { Component, Input } from '@angular/core';
import { Included } from 'src/app/models/included.model';
import { TagsHelper } from 'src/app/helpers/tags.helper';

@Component({
  selector: 'app-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrls: ['./project-tags.component.sass']
})
export class ProjectTagsComponent {

  groups: any;

  constructor(
    private tagsHelper: TagsHelper,
  ) { }

  @Input()
  set objectIncluded(objectIncluded: Included[]) {
    this.groups = this.tagsHelper.getProjectsGroupsWithTags(objectIncluded);
  }
}
