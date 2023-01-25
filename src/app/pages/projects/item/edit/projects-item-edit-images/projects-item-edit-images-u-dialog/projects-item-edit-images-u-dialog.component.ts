import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatStepper } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-item-edit-images-u-dialog',
  templateUrl: './projects-item-edit-images-u-dialog.component.html',
  styleUrls: ['./projects-item-edit-images-u-dialog.component.sass']
})
export class ProjectsItemEditImagesUDialogComponent implements OnInit {

  public stepperIsEditable: boolean = true;
  public stepperDisabledAnimation: boolean = false;

  private tempFile;
  public previewUrl:any = null;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public formStatus = {
    submitting: false,
    success: null,
  };

  licences = [
    {
      name: 'CC0 1.0 Universal',
      url: 'https://creativecommons.org/publicdomain/zero/1.0/legalcode'
    },
    {
      name: 'Attribution 4.0 International',
      url: 'https://creativecommons.org/licenses/by/4.0/legalcode'
    },
    {
      name: 'Attribution-ShareAlike 4.0 International',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode'
    }
  ];

  filetypes: [];
  photographyConstraints = {
    min: '',
    max: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ProjectsItemEditImagesUDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.filetypes = this.data.filetypes;
    var constraints = this.filetypes.find(
      ft => ft['attributes']['name'] == 'photography'
    )['allowedFormats'][0];
    this.photographyConstraints.min = constraints['attributes']['edge_px_min'] + 'x' + constraints['attributes']['edge_px_min'];
    this.photographyConstraints.max = constraints['attributes']['edge_px_max'] + 'x' + constraints['attributes']['edge_px_max'];

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      filetype:         ['', Validators.required],
      licence:          ['', Validators.required],
      source:           [''],
      source_url:       [''],
      author:           [''],
      file_description: ['', Validators.required],
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          fileEntry.file(info => {
            console.log(info);
            var reader = new FileReader();
            var preview = document.querySelector("img");
            reader.readAsDataURL(info);
            reader.onload = (_event) => {
              this.previewUrl = reader.result;
            }
          });

          this.tempFile = {
            file: file,
            droppedFile: droppedFile.relativePath
          }
        });
      }
    }
  }

  saveFileAndData(stepper: MatStepper) {
    if (this.secondFormGroup.invalid) {
      this.notificationService.notification$.next({
        content: this.translate.instant('form.invalid-msg'),
        type: 'any'
      });
      return;
    }
    this.formStatus.submitting = true;

    var formValues = {};
    for (const field in this.secondFormGroup.controls) {
      formValues[field] = this.secondFormGroup.controls[field].value;
    }

    let fileFormData = new FormData();
    fileFormData.append('files[0][file]', this.tempFile.file, this.tempFile.droppedFile);
    fileFormData.append('files[0][filetype]', formValues['filetype']);
    fileFormData.append('files[0][file_description]', formValues['file_description']);

    let metas = ['licence', 'source', 'source_url', 'author'];
    metas.forEach(m => {
      if (formValues[m]) {
        fileFormData.append('files[0][meta]['+m+']', formValues[m]);
      }
    })

    this.projectService.createProjectImage(this.data.project_id, fileFormData)
    .subscribe(
      data => {
        this.stepperIsEditable = false;
        this.stepperDisabledAnimation = true;
        stepper.next();
      },
      error => {
        console.log('error');
        this.notificationService.notification$.next({
          content: error.error.errors,
          type: 'danger'
        });
    })
    .add(() => this.formStatus.submitting = false);
  }
}
