/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenerateBillsService } from './generateBills.service';

describe('Service: GenerateBills', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateBillsService]
    });
  });

  it('should ...', inject([GenerateBillsService], (service: GenerateBillsService) => {
    expect(service).toBeTruthy();
  }));
});
