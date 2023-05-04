/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorSlotServiceService } from './doctorSlotService.service';

describe('Service: DoctorSlotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorSlotServiceService]
    });
  });

  it('should ...', inject([DoctorSlotServiceService], (service: DoctorSlotServiceService) => {
    expect(service).toBeTruthy();
  }));
});
