import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PropertiesHelper } from 'src/app/helpers/properties.helper';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';

@Component({
  selector: 'app-projects-item-edit-properties',
  templateUrl: './projects-item-edit-properties.component.html',
  styleUrls: ['./projects-item-edit-properties.component.sass'],
  host: {
    class: 'project-item-edit-properties',
  },
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
  ],
})
export class ProjectsItemEditPropertiesComponent implements OnInit, ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.form.dirty)
  }

  public project: Project;
  public form = new FormGroup({});
  public formValues = {
    properties: {}
  };
  public fields: FormlyFieldConfig[];
  public formStatus = {
    submitting: false,
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private projectService: ProjectService,
    private propertiesHelper: PropertiesHelper,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;

      // Generate properties fields
      let propertiesFields = [];
      this.propertiesHelper.getAllProperties(data.projectPropertiesMeta).forEach(p => {

        let label = p.descriptions[0].name;
        // Add unit to label
        if (!p.format.unit_is_hidden) {
          label = `${label} [${p.format.unit_short}]`
        }

        let field = {
          key: p.format.name,
          type: 'input',
          templateOptions: {
            label: label,
            description: p.descriptions[0].description
          }
        };
        if (p.format.data_type === 'integer') {
          field.templateOptions['type'] = 'number';
        }
        if (p.format.data_type === 'date') {
          field.type = 'datepicker';
        }
        propertiesFields.push(field);
      });

      // Create form
      this.fields = [
        {
          key: 'properties',
          fieldGroup: propertiesFields
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Description of your modifications',
          }
        }
      ];

      this.populateForm(data.projectMeta.included);
    });
  }

  private populateForm(included:Array<any>) {
    let properties = this.propertiesHelper.getProjectsProperties(included);
    properties.forEach(p => {
      this.formValues.properties[p.format.name] = p.value;
    });
  }

  public submit() {
    if (this.form.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.formStatus.submitting = true;

    // Format input
    let input = {
      description: this.formValues['description'],
      properties: []
    }

    for (const key in this.formValues['properties']) {

      // remove nulls
      if (this.formValues['properties'][key]) {

        // convert dates objects to strings
        if (typeof this.formValues['properties'][key] === 'object') {
          this.formValues['properties'][key] = this.formValues['properties'][key].format('YYYY-MM-DD')
        }

        input.properties.push({
          name: key,
          value: this.formValues['properties'][key]
        });
      }
    }

    this.projectService.updateProject(this.project.id, input)
    .subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'Project updated',
          type: 'success'
        });
        this.form.markAsPristine();
      },
      error => {
        console.log(error)
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      }
    )
    .add(() => this.formStatus.submitting = false);
  }

}
