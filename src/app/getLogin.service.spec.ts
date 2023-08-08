/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetLoginService } from './getLogin.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: GetLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLoginService],
      imports:[HttpClientModule]
    });
  });

  it('should ...', inject([GetLoginService], (service: GetLoginService) => {
    expect(service).toBeTruthy();
  }));
});
