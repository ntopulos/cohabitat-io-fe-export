import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditComponent } from './projects-item-edit.component';

describe('ProjectsItemEditComponent', () => {
  let component: ProjectsItemEditComponent;
  let fixture: ComponentFixture<ProjectsItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
