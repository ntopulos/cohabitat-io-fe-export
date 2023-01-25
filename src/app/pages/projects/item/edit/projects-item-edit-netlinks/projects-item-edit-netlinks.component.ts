import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project/project.model';
import { FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-item-edit-netlinks',
  templateUrl: './projects-item-edit-netlinks.component.html',
  styleUrls: ['./projects-item-edit-netlinks.component.sass']
})
export class ProjectsItemEditNetlinksComponent implements OnInit, ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.form.dirty)
  }

  public project: Project;
  public form = new FormGroup({});
  public formValues = {
    netlinks: {
      social: {}
    }
  };
  public fields: FormlyFieldConfig[];
  public formStatus = {
    submitting: false,
  };

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private projectService: ProjectService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;

      // Create form
      this.fields = [
        {
          key: 'netlinks',
          fieldGroup: [
            {
              key: 'official',
              type: 'input',
              templateOptions: {
                type: 'url',
                label: 'Official website',
              }
            },
            {
              key: 'social',
              fieldGroup: [
                {
                  key: 'facebook',
                  type: 'input',
                  templateOptions: {
                    type: 'url',
                    label: 'Facebook',
                  }
                },
                {
                  key: 'flickr',
                  type: 'input',
                  templateOptions: {
                    type: 'url',
                    label: 'Flickr',
                  }
                },
                {
                  key: 'instagram',
                  type: 'input',
                  templateOptions: {
                    type: 'url',
                    label: 'Instagram',
                  }
                },
                {
                  key: 'twitter',
                  type: 'input',
                  templateOptions: {
                    type: 'url',
                    label: 'Twitter',
                  }
                }
              ]
            }
          ]
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

      this.populateForm();
    });
  }

  private populateForm() {
    if (this.project.attributes.netlinks) {
      this.project.attributes.netlinks.forEach(l => {
        if (l.type.match(/\bsocial:\b/g)) {
          this.formValues.netlinks.social[l.type.substring(7)] = l.url;
        } else {
          this.formValues.netlinks[l.type] = l.url;
        }
      });
    }
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
      netlinks: []
    }
    if (this.formValues.netlinks['official']) {
      input.netlinks.push({
        type: 'official',
        url: this.formValues.netlinks['official']
      });
    }
    for (const key in this.formValues.netlinks.social) {
      if (this.formValues.netlinks.social[key]) {
        input.netlinks.push({
          type: 'social:'+key,
          url: this.formValues.netlinks.social[key]
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
