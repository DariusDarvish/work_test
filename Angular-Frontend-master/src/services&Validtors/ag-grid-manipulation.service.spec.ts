import { TestBed } from '@angular/core/testing';

import { AgGridVariablesService } from './ag-grid-manipulation';

describe('AgGridVariablesService', () => {
  let service: AgGridVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgGridVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
