import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAnalysisComponent } from './finance-analysis.component';

describe('FinanceAnalysisComponent', () => {
  let component: FinanceAnalysisComponent;
  let fixture: ComponentFixture<FinanceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
