import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsImageComponent } from './objects-image.component';

describe('ObjectsImageComponent', () => {
  let component: ObjectsImageComponent;
  let fixture: ComponentFixture<ObjectsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
