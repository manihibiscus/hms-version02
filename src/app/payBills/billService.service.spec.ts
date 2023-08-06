/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BillServiceService } from './billService.service';

describe('Service: BillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillServiceService]
    });
  });

  it('should ...', inject([BillServiceService], (service: BillServiceService) => {
    expect(service).toBeTruthy();
  }));
});
