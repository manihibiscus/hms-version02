/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailsService } from './details.service';

describe('Service: Details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsService]
    });
  });

  it('should ...', inject([DetailsService], (service: DetailsService) => {
    expect(service).toBeTruthy();
  }));
});
