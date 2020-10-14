import { TestBed } from '@angular/core/testing';

import { ProtectOnboardingService } from './protect-onboarding.service';

describe('ProtectOnboardingService', () => {
  let service: ProtectOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
