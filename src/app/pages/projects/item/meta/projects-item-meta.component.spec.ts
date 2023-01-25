import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemMetaComponent } from './projects-item-meta.component';

describe('ProjectsItemMetaComponent', () => {
  let component: ProjectsItemMetaComponent;
  let fixture: ComponentFixture<ProjectsItemMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
