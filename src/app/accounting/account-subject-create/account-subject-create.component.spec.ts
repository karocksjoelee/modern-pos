import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubjectCreateComponent } from './account-subject-create.component';

describe('AccountSubjectCreateComponent', () => {
  let component: AccountSubjectCreateComponent;
  let fixture: ComponentFixture<AccountSubjectCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
