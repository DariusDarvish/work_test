import { TestBed } from '@angular/core/testing';

import { EmaillistService } from './emaillist.service';

describe('EmaillistService', () => {
  let service: EmaillistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmaillistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
