import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordRespondComponent } from './reset-password-respond.component';

describe('ResetPasswordRespondComponent', () => {
  let component: ResetPasswordRespondComponent;
  let fixture: ComponentFixture<ResetPasswordRespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordRespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
