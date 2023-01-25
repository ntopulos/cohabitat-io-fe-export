import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-item-edit-images-d-dialog',
  templateUrl: './projects-item-edit-images-d-dialog.component.html',
  styleUrls: ['./projects-item-edit-images-d-dialog.component.sass']
})
export class ProjectsItemEditImagesDDialogComponent implements OnInit {

  public form = new FormGroup({});
  public formValues = {};
  public formStatus = {
    submitting: false,
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description and reason for your action',
        required: true,
      }
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ProjectsItemEditImagesDDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit() { }

  submit() {
    if (this.form.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.formStatus.submitting = true;

    this.projectService.deleteProjectFile(
      this.data.project.id,
      this.data.file.file.id,
      this.formValues['description']
    )
    .subscribe(
      data => {
        this.dialogRef.close();
        window.location.reload();
      },
      error => {
        console.log(error);
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
      }
    )
    .add(() => this.formStatus.submitting = false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
