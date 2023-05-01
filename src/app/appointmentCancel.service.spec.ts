/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppointmentCancelService } from './appointmentCancel.service';

describe('Service: AppointmentCancel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentCancelService]
    });
  });

  it('should ...', inject([AppointmentCancelService], (service: AppointmentCancelService) => {
    expect(service).toBeTruthy();
  }));
});
