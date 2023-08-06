import { TestBed } from '@angular/core/testing';

import { AuthendGuard } from './authend.guard';

describe('AuthendGuard', () => {
  let guard: AuthendGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthendGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
