import { TestBed } from '@angular/core/testing';

import { BlockedWhenLoggedInService } from './blocked-when-logged-in.service';

describe('BlockedWhenLoggedInService', () => {
  let service: BlockedWhenLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedWhenLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
