import { TestBed } from '@angular/core/testing';

import { SettingsPermissionGuardService } from './settings-permission-guard.service';

describe('SettingsPermissionGuardService', () => {
  let service: SettingsPermissionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsPermissionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
