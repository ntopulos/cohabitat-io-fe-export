import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditImagesDDialogComponent } from './projects-item-edit-images-d-dialog.component';

describe('ProjectsItemEditImagesDDialogComponent', () => {
  let component: ProjectsItemEditImagesDDialogComponent;
  let fixture: ComponentFixture<ProjectsItemEditImagesDDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditImagesDDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditImagesDDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
