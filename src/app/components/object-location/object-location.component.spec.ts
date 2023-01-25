import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectLocationComponent } from './object-location.component';

describe('ObjectLocationComponent', () => {
  let component: ObjectLocationComponent;
  let fixture: ComponentFixture<ObjectLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
