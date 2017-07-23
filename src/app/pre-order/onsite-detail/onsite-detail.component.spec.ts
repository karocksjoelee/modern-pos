import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteDetailComponent } from './onsite-detail.component';

describe('OnsiteDetailComponent', () => {
  let component: OnsiteDetailComponent;
  let fixture: ComponentFixture<OnsiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
