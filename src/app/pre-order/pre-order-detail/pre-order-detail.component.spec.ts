import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderDetailComponent } from './pre-order-detail.component';

describe('PreOrderDetailComponent', () => {
  let component: PreOrderDetailComponent;
  let fixture: ComponentFixture<PreOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
