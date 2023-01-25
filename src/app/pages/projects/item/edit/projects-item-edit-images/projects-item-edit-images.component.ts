import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Project } from 'src/app/models/project/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { ProjectsItemEditImagesDDialogComponent } from './projects-item-edit-images-d-dialog/projects-item-edit-images-d-dialog.component';
import { ProjectsItemEditImagesMDialogComponent } from './projects-item-edit-images-m-dialog/projects-item-edit-images-m-dialog.component';
import { ProjectsItemEditImagesUDialogComponent } from './projects-item-edit-images-u-dialog/projects-item-edit-images-u-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-projects-item-edit-images',
  templateUrl: './projects-item-edit-images.component.html',
  styleUrls: ['./projects-item-edit-images.component.sass']
})
export class ProjectsItemEditImagesComponent implements OnInit {

  public project: Project;
  public projectFiles;
  public filetypes;
  public files;
  public formStatus = {
    submitting: false,
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.projectMeta.project;

      if (data.projectFilesMeta.objectFile) {
        this.files = data.projectFilesMeta.objectFile;

        let included = data.projectFilesMeta.included;
        let includedFiles = included.filter(e => e.type === 'files');
        let includedFilesMetas = included.filter(e => e.type === 'files-metas');

        this.files.forEach((e, i)=> {
          e.dynamic_order = i+1;
          e.file = includedFiles.find(x => x.id === e.relationships.file.data.id);
          e.file.meta = includedFilesMetas.find(x => x.id === e.file.relationships.meta.data.id)
        });
      }

      this.filetypes = data.filetypesMeta.filetypes;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  // reorder
  public submit() {
    this.formStatus.submitting = true;

    let input = {
      order: []
    };

    this.files.forEach((e, i)=> {
      input.order.push(e.dynamic_order);
    });

    this.projectService.updateProjectImagesOrder(this.project.id, input)
    .subscribe(
      data => {
        this.notificationService.notification$.next({
          content: 'Project updated',
          type: 'success'
        });
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

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(ProjectsItemEditImagesUDialogComponent, {
      width: '620px',
      data: {
        project_id: this.project.id,
        filetypes: this.filetypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  openMakeMainDialog(data): void {
    const dialogRef = this.dialog.open(ProjectsItemEditImagesMDialogComponent, {
      width: '320px',
      data: data
    });
  }

  openDeleteDialog(data): void {
    const dialogRef = this.dialog.open(ProjectsItemEditImagesDDialogComponent, {
      width: '320px',
      data: data
    });
  }

}
