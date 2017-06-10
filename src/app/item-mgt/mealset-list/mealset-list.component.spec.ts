import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsetListComponent } from './mealset-list.component';

describe('MealsetListComponent', () => {
  let component: MealsetListComponent;
  let fixture: ComponentFixture<MealsetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
