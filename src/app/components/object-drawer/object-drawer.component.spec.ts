import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDrawerComponent } from './object-drawer.component';

describe('ObjectDrawerComponent', () => {
  let component: ObjectDrawerComponent;
  let fixture: ComponentFixture<ObjectDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
