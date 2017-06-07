import { TestBed, inject } from '@angular/core/testing';

import { ItemMgtService } from './item-mgt.service';

describe('ItemMgtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemMgtService]
    });
  });

  it('should be created', inject([ItemMgtService], (service: ItemMgtService) => {
    expect(service).toBeTruthy();
  }));
});
