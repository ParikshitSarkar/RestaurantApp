import { TestBed } from '@angular/core/testing';

import { DishProvider } from '../providers/dish.service';

describe('DishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishProvider = TestBed.get(DishProvider);
    expect(service).toBeTruthy();
  });
});
