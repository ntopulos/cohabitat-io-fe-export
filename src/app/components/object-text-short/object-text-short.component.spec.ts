import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTextShortComponent } from './object-text-short.component';

describe('ObjectTextShortComponent', () => {
  let component: ObjectTextShortComponent;
  let fixture: ComponentFixture<ObjectTextShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTextShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTextShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
