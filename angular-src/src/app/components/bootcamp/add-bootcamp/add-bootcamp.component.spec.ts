import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBootcampComponent } from './add-bootcamp.component';

describe('AddBootcampComponent', () => {
  let component: AddBootcampComponent;
  let fixture: ComponentFixture<AddBootcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBootcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
