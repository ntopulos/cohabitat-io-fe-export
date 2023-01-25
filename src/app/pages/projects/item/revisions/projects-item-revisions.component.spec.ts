import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemRevisionsComponent } from './projects-item-revisions.component';

describe('ProjectsItemRevisionsComponent', () => {
  let component: ProjectsItemRevisionsComponent;
  let fixture: ComponentFixture<ProjectsItemRevisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemRevisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemRevisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
