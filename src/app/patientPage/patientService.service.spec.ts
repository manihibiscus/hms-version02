/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientServiceService } from './patientService.service';

describe('Service: PatientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientServiceService]
    });
  });

  it('should ...', inject([PatientServiceService], (service: PatientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
