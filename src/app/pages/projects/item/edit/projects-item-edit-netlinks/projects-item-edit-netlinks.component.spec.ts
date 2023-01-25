import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditNetlinksComponent } from './projects-item-edit-netlinks.component';

describe('ProjectsItemEditNetlinksComponent', () => {
  let component: ProjectsItemEditNetlinksComponent;
  let fixture: ComponentFixture<ProjectsItemEditNetlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditNetlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditNetlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
