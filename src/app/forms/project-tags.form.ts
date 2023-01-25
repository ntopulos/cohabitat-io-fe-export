import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProjectTagsForm {

  public getTagsForm(tagGroups:Array<any>, type = 'create') {

    let formGroup = {
      key: 'tags',
      className: 'tags-groups',
      fieldGroup: []
    };

    tagGroups.forEach(group => {
      let tagsOfGroup = [];

      group.tags.forEach(t => {
        tagsOfGroup.push({
          label: t.details[0].name,
          value: t.slug,
        });
      });

      formGroup.fieldGroup.push({
        key: group.slug,
        type: 'multicheckbox',
        templateOptions: {
          label: group.details[0].name,
          options: tagsOfGroup,
          required: (group.slug === 'organisation' && type == 'create'),
        },
      });
    });

    return formGroup;
  }

}

