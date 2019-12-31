import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBootcampComponent } from './manage-bootcamp.component';

describe('ManageBootcampComponent', () => {
  let component: ManageBootcampComponent;
  let fixture: ComponentFixture<ManageBootcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBootcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
