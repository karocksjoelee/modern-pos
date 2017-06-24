import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubjectListComponent } from './account-subject-list.component';

describe('AccountSubjectListComponent', () => {
  let component: AccountSubjectListComponent;
  let fixture: ComponentFixture<AccountSubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
