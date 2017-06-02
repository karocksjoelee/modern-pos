import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteOrderComponent } from './onsite-order.component';

describe('OnsiteOrderComponent', () => {
  let component: OnsiteOrderComponent;
  let fixture: ComponentFixture<OnsiteOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
