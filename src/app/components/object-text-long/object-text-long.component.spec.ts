import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTextLongComponent } from './object-text-long.component';

describe('ObjectTextLongComponent', () => {
  let component: ObjectTextLongComponent;
  let fixture: ComponentFixture<ObjectTextLongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTextLongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTextLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
