import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectVideosComponent } from './object-videos.component';

describe('ObjectVideosComponent', () => {
  let component: ObjectVideosComponent;
  let fixture: ComponentFixture<ObjectVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
