import { TestBed } from '@angular/core/testing';

import { CmproxyService } from './cmproxy.service';

describe('CmproxyService', () => {
  let service: CmproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
