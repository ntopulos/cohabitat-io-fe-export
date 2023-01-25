import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemRevisionsItemComponent } from './projects-item-revisions-item.component';

describe('ProjectsItemRevisionsItemComponent', () => {
  let component: ProjectsItemRevisionsItemComponent;
  let fixture: ComponentFixture<ProjectsItemRevisionsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemRevisionsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemRevisionsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
