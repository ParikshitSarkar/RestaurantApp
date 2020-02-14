import { TestBed } from '@angular/core/testing';

import { PromotionProvider } from './promotion.service';

describe('PromotionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionProvider = TestBed.get(PromotionProvider);
    expect(service).toBeTruthy();
  });
});
