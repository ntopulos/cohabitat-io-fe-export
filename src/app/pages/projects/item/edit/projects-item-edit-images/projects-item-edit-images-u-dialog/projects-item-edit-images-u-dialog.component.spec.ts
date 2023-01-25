import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditImagesUDialogComponent } from './projects-item-edit-images-u-dialog.component';

describe('ProjectsItemEditImagesUDialogComponent', () => {
  let component: ProjectsItemEditImagesUDialogComponent;
  let fixture: ComponentFixture<ProjectsItemEditImagesUDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditImagesUDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditImagesUDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
