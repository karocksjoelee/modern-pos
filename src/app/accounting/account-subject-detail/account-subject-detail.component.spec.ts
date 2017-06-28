import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubjectDetailComponent } from './account-subject-detail.component';

describe('AccountSubjectDetailComponent', () => {
  let component: AccountSubjectDetailComponent;
  let fixture: ComponentFixture<AccountSubjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
