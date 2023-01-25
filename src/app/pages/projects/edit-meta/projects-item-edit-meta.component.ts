import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project/project.model';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PROJECT_BASICS_FORM } from 'src/app/forms/project-basics.form';
import { ProjectTagsForm } from 'src/app/forms/project-tags.form';
import { TagsHelper } from 'src/app/helpers/tags.helper';

@Component({
  selector: 'app-projects-item-edit-meta',
  templateUrl: './projects-item-edit-meta.component.html',
  styleUrls: ['./projects-item-edit-meta.component.sass']
})
export class ProjectsItemEditMetaComponent implements OnInit {

  public project: Project;
  public projectCreated: Project;
  public createdProject;
  public initialMapCenter = {
    lat: 46.95,
    lng: 7.45
  };
  public formStatus = {
    submitting: false,
  };

  public currentLang: any;

  public form = new FormGroup({});
  public formValues;
  public fields: FormlyFieldConfig[] = PROJECT_BASICS_FORM;
  private allTags;

  @Output() formChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private projectTagsForm: ProjectTagsForm,
    private tagsHelper: TagsHelper,
  ) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;

    this.route.data.subscribe(data => {
      // if is edit
      if (data.projectMeta) {
        this.project = data.projectMeta.project;

        this.formValues = {
          basics: {
            name: this.project.attributes.name,
            name_short: this.project.attributes.name_short,
            status_slug: this.project.attributes.status,
            coordinates: {
              latitude: this.project.attributes.coordinates.lat,
              longitude: this.project.attributes.coordinates.lng,
            }
          },
          tags: {}
        }
      } else {
        this.formValues = {
          basics: {
            coordinates: {
              latitude: this.initialMapCenter.lat,
              longitude: this.initialMapCenter.lng,
            }
          }
        }
      }

      this.allTags = this.tagsHelper.getAllGroupsWithTags(data.tagsgroupsMeta);
      let tagsForm = this.projectTagsForm.getTagsForm(this.allTags);
      if (this.fields.length < 2) {
        this.fields.push(tagsForm);
      }

      if (this.project) {
        // Populate tags
        this.populateFormTags(data.projectMeta.included);
        this.addRevisionDescription();

        setTimeout( () => {
          // Emit value change for alert on navigation
          this.form.valueChanges.subscribe(
            result => {
              this.formChanged.emit(true);
            }
          );
        }, 1 );
      }
    });
  }

  private populateFormTags(included:Array<any>) {
    included.forEach(e => {
      if (e.type === 'tags') {
        let group = this.allTags.find(x => x.id === e.relationships.tags_group.data.id)['slug'];
        if (this.formValues.tags[group]) {
          this.formValues.tags[group][e.attributes.slug] = true;
        } else {
          this.formValues.tags[group] = {
            [e.attributes.slug]: true
          }
        }
      }
    });
  }

  private addRevisionDescription() {
    if (this.fields.length < 3) {
      this.fields.push({
        key: 'description',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Description of your modifications',
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
    let input = JSON.parse(JSON.stringify(this.formValues))
    input.tags= this.formatTags(input.tags);

    if (!input.basics.name_short) {
      delete input.basics.name_short;
    }

    if (this.project) {
      this.updateProject(input);
    } else {
      this.createProject(input);
    }
  }

  private updateProject(input) {
    this.projectService.updateProject(this.project.id, input)
    .subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'Project updated',
          type: 'success'
        });
        // this.form.get('description').setValue('');
        this.form.markAsPristine();
        this.formChanged.emit(false);
      },
      error => {
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      },
    )
    .add(() => this.formStatus.submitting = false);
  }

  private createProject(input) {
    this.projectService.createProject(input)
    .subscribe(
      data => {
        this.projectCreated = data.project;
      },
      error => {
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      },
    )
    .add(() => this.formStatus.submitting = false);
  }

  // Convert tags format to the format of the API input
  private formatTags(inputTags)
  {
    var tags = [];
    for (var group in inputTags) {
      var groupTags = inputTags[group];
      for (var t in groupTags) {
        if (groupTags[t]) {
          tags.push({
            "group": group,
            "slug": t
          })
        }
      }
    }
    return tags;
  }

  public mapMoved(value) {
    this.formChanged.emit(true);
  }

}
