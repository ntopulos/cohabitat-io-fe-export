import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditVideosComponent } from './projects-item-edit-videos.component';

describe('ProjectsItemEditVideosComponent', () => {
  let component: ProjectsItemEditVideosComponent;
  let fixture: ComponentFixture<ProjectsItemEditVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
