import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMgtComponent } from './member-mgt.component';

describe('MemberMgtComponent', () => {
  let component: MemberMgtComponent;
  let fixture: ComponentFixture<MemberMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
