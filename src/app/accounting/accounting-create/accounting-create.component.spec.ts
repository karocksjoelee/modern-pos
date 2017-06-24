import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingCreateComponent } from './accounting-create.component';

describe('AccountingCreateComponent', () => {
  let component: AccountingCreateComponent;
  let fixture: ComponentFixture<AccountingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
