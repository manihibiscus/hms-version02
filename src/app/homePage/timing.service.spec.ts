/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimingService } from './timing.service';

describe('Service: Timing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimingService]
    });
  });

  it('should ...', inject([TimingService], (service: TimingService) => {
    expect(service).toBeTruthy();
  }));
});
