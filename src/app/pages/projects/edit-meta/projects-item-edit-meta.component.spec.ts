import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditMetaComponent } from './projects-item-edit-meta.component';

describe('ProjectsItemEditMetaComponent', () => {
  let component: ProjectsItemEditMetaComponent;
  let fixture: ComponentFixture<ProjectsItemEditMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
