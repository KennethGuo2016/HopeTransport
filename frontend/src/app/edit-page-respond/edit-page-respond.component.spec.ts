import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageRespondComponent } from './edit-page-respond.component';

describe('EditPageRespondComponent', () => {
  let component: EditPageRespondComponent;
  let fixture: ComponentFixture<EditPageRespondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPageRespondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
