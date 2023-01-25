import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectImageComponent } from './project-image.component';

describe('ObjectImageComponent', () => {
  let component: ObjectImageComponent;
  let fixture: ComponentFixture<ObjectImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
