import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectImagesComponent } from './object-images.component';

describe('ObjectImagesComponent', () => {
  let component: ObjectImagesComponent;
  let fixture: ComponentFixture<ObjectImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
