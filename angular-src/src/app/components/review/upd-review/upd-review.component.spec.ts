import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdReviewComponent } from './upd-review.component';

describe('UpdReviewComponent', () => {
  let component: UpdReviewComponent;
  let fixture: ComponentFixture<UpdReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
