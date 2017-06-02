import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMgtComponent } from './item-mgt.component';

describe('ItemMgtComponent', () => {
  let component: ItemMgtComponent;
  let fixture: ComponentFixture<ItemMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
