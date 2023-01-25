import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project/project.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ComponentCanDeactivate } from 'src/app/helpers/pending-changes.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-item-edit-videos',
  templateUrl: './projects-item-edit-videos.component.html',
  styleUrls: ['./projects-item-edit-videos.component.sass']
})
export class ProjectsItemEditVideosComponent implements OnInit, ComponentCanDeactivate {

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !(this.form.dirty)
  }

  public project: Project;
  public form = new FormGroup({});
  public formValues = {videos: [{}]};
  public formStatus = {
    submitting: false,
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'videos',
      type: 'repeat',
      templateOptions: {
        addText: 'Add a video',
      },
      fieldArray: {
        fieldGroup: [
          {
            type: 'select',
            key: 'type',
            templateOptions: {
              label: 'Source',
              required: true,
              options: [
                {
                  label: "YouTube",
                  value: "youtube",
                },
                {
                  label: "Vimeo",
                  value: "vimeo",
                },
              ],
            },
          },
          {
            type: 'input',
            key: 'id',
            templateOptions: {
              required: true,
              type: 'text',
              label: 'Id',
            },
          }
        ],
      },
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'text',
        label: 'Description of your modifications',
      }
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;
      this.formValues.videos = this.project.attributes['videos'];
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

    // Format array in case of removal of all videos
    var inputValues = this.formValues;
    if(this.formValues['videos'].length == 0) {
      inputValues.videos = [null];
    }

    this.projectService.updateProject(this.project.id, inputValues)
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
