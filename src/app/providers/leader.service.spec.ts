import { TestBed } from '@angular/core/testing';

import { LeaderProvider } from './leader.service';

describe('LeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderProvider = TestBed.get(LeaderProvider);
    expect(service).toBeTruthy();
  });
});
