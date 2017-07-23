import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteListComponent } from './onsite-list.component';

describe('OnsiteListComponent', () => {
  let component: OnsiteListComponent;
  let fixture: ComponentFixture<OnsiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
