import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-item-edit-images-m-dialog',
  templateUrl: './projects-item-edit-images-m-dialog.component.html',
  styleUrls: ['./projects-item-edit-images-m-dialog.component.sass']
})
export class ProjectsItemEditImagesMDialogComponent implements OnInit {

  public formStatus = {
    submitting: false,
    errors: null,
    success: null,
  };

  constructor(
    public dialogRef: MatDialogRef<ProjectsItemEditImagesMDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
  }

  submit() {
    this.formStatus.submitting = true;

    this.projectService.updateProjectMainImage(
      this.data.project.id,
      this.data.file.file.id,
      )
      .subscribe(
        data => {
          this.formStatus.errors = null;
          this.dialogRef.close();
          window.location.reload();
        },
        error => {
          this.formStatus.errors = error.error.errors;
          this.formStatus.success = null
          this.formStatus.submitting = false;
        });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
