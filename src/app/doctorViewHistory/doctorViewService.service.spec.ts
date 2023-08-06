/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorViewServiceService } from './doctorViewService.service';

describe('Service: DoctorViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorViewServiceService]
    });
  });

  it('should ...', inject([DoctorViewServiceService], (service: DoctorViewServiceService) => {
    expect(service).toBeTruthy();
  }));
});
