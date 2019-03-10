import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignupRespondComponent } from './admin-signup-respond.component';

describe('AdminSignupRespondComponent', () => {
  let component: AdminSignupRespondComponent;
  let fixture: ComponentFixture<AdminSignupRespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSignupRespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignupRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
