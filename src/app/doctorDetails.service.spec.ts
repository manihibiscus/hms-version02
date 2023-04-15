/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorDetailsService } from './doctorDetails.service';

describe('Service: DoctorDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorDetailsService]
    });
  });

  it('should ...', inject([DoctorDetailsService], (service: DoctorDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
