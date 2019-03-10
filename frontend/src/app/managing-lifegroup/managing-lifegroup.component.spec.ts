import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagingLifegroupComponent } from './managing-lifegroup.component';

describe('ManagingLifegroupComponent', () => {
  let component: ManagingLifegroupComponent;
  let fixture: ComponentFixture<ManagingLifegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingLifegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingLifegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
