import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsetDetailComponent } from './mealset-detail.component';

describe('MealsetDetailComponent', () => {
  let component: MealsetDetailComponent;
  let fixture: ComponentFixture<MealsetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
