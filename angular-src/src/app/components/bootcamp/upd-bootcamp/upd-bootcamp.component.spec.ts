import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdBootcampComponent } from './upd-bootcamp.component';

describe('UpdBootcampComponent', () => {
  let component: UpdBootcampComponent;
  let fixture: ComponentFixture<UpdBootcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdBootcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
