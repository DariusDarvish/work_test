import { TestBed } from '@angular/core/testing';

import { CustomValidtaionPasswordService } from './custom-validtaion-password.service';

describe('CustomValidtaionPasswordService', () => {
  let service: CustomValidtaionPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidtaionPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
