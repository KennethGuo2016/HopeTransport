import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRespondsComponent } from './submit-responds.component';

describe('SubmitRespondsComponent', () => {
  let component: SubmitRespondsComponent;
  let fixture: ComponentFixture<SubmitRespondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRespondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRespondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
