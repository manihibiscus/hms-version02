/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddDetailsService } from './addDetails.service';

describe('Service: AddDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDetailsService]
    });
  });

  it('should ...', inject([AddDetailsService], (service: AddDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
