import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditBasicsComponent } from './projects-item-edit-basics.component';

describe('ProjectsItemEditBasicsComponent', () => {
  let component: ProjectsItemEditBasicsComponent;
  let fixture: ComponentFixture<ProjectsItemEditBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
