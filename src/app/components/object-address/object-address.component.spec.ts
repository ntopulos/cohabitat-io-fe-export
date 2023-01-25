import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAddressComponent } from './object-address.component';

describe('ObjectAddressComponent', () => {
  let component: ObjectAddressComponent;
  let fixture: ComponentFixture<ObjectAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
