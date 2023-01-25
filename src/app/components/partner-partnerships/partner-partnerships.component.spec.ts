import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPartnershipsComponent } from './partner-partnerships.component';

describe('PartnerPartnershipsComponent', () => {
  let component: PartnerPartnershipsComponent;
  let fixture: ComponentFixture<PartnerPartnershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPartnershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
