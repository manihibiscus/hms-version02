import { TestBed } from '@angular/core/testing';

import { ConformationGuard } from './conformation.guard';

describe('ConformationGuard', () => {
  let guard: ConformationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConformationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
