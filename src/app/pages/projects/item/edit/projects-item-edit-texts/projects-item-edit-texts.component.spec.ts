import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditTextsComponent } from './projects-item-edit-texts.component';

describe('ProjectsItemEditTextsComponent', () => {
  let component: ProjectsItemEditTextsComponent;
  let fixture: ComponentFixture<ProjectsItemEditTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
