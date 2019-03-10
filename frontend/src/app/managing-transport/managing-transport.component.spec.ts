import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingTransportComponent } from './managing-transport.component';

describe('ManagingTransportComponent', () => {
  let component: ManagingTransportComponent;
  let fixture: ComponentFixture<ManagingTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
