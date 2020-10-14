import { TestBed } from '@angular/core/testing';

import { ProtectloadingpageService } from './protectloadingpage.service';

describe('ProtectloadingpageService', () => {
  let service: ProtectloadingpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectloadingpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
