import { TestBed } from '@angular/core/testing';

import { ProfilecheckService } from './profilecheck.service';

describe('ProfilecheckService', () => {
  let service: ProfilecheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilecheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
