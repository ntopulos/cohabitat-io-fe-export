import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditImagesMDialogComponent } from './projects-item-edit-images-m-dialog.component';

describe('ProjectsItemEditImagesMDialogComponent', () => {
  let component: ProjectsItemEditImagesMDialogComponent;
  let fixture: ComponentFixture<ProjectsItemEditImagesMDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditImagesMDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditImagesMDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
