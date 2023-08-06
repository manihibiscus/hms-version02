/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetLoginService } from './getLogin.service';

describe('Service: GetLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLoginService]
    });
  });

  it('should ...', inject([GetLoginService], (service: GetLoginService) => {
    expect(service).toBeTruthy();
  }));
});
