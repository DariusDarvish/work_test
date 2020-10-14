import { TestBed } from '@angular/core/testing';

import { CompguardsService } from './compguards.service';

describe('CompguardsService', () => {
  let service: CompguardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompguardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
