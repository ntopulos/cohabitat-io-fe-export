import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersItemEditPartnershipsComponent } from './partners-item-edit-partnerships.component';

describe('PartnersItemEditPartnershipsComponent', () => {
  let component: PartnersItemEditPartnershipsComponent;
  let fixture: ComponentFixture<PartnersItemEditPartnershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersItemEditPartnershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersItemEditPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
