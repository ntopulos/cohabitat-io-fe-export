import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditPropertiesComponent } from './projects-item-edit-properties.component';

describe('ProjectsItemEditPropertiesComponent', () => {
  let component: ProjectsItemEditPropertiesComponent;
  let fixture: ComponentFixture<ProjectsItemEditPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
