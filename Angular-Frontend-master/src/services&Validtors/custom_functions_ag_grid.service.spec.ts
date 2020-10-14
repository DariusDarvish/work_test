import { TestBed } from '@angular/core/testing';

import { CurrencycellrendererService } from './custom_functions_ag_grid';

describe('CurrencycellrendererService', () => {
  let service: CurrencycellrendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencycellrendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
