/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemarkServiceService } from './remarkService.service';

describe('Service: RemarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemarkServiceService]
    });
  });

  it('should ...', inject([RemarkServiceService], (service: RemarkServiceService) => {
    expect(service).toBeTruthy();
  }));
});
