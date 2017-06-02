import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationInfoComponent } from './operation-info.component';

describe('OperationInfoComponent', () => {
  let component: OperationInfoComponent;
  let fixture: ComponentFixture<OperationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
