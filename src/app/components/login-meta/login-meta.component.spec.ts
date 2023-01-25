import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMetaComponent } from './login-meta.component';

describe('LoginMetaComponent', () => {
  let component: LoginMetaComponent;
  let fixture: ComponentFixture<LoginMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
