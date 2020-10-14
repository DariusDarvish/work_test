import { TestBed } from '@angular/core/testing';

import { ProtectcompanyService } from './protectcompany.service';

describe('ProtectcompanyService', () => {
  let service: ProtectcompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectcompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
