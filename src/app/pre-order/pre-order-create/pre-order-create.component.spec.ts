import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderCreateComponent } from './pre-order-create.component';

describe('PreOrderCreateComponent', () => {
  let component: PreOrderCreateComponent;
  let fixture: ComponentFixture<PreOrderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
