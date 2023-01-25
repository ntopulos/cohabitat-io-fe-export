import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemEditImagesComponent } from './projects-item-edit-images.component';

describe('ProjectsItemEditImagesComponent', () => {
  let component: ProjectsItemEditImagesComponent;
  let fixture: ComponentFixture<ProjectsItemEditImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsItemEditImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsItemEditImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
