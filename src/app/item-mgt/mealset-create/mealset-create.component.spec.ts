import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsetCreateComponent } from './mealset-create.component';

describe('MealsetCreateComponent', () => {
  let component: MealsetCreateComponent;
  let fixture: ComponentFixture<MealsetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
