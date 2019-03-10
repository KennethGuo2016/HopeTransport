import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingPeopleComponent } from './managing-people.component';

describe('ManagingPeopleComponent', () => {
  let component: ManagingPeopleComponent;
  let fixture: ComponentFixture<ManagingPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
