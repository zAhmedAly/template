import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBootcampComponent } from './list-bootcamp.component';

describe('ListBootcampComponent', () => {
  let component: ListBootcampComponent;
  let fixture: ComponentFixture<ListBootcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBootcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
