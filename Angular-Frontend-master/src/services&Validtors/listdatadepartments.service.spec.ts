import { TestBed } from '@angular/core/testing';

import { ListdatadepartmentsService } from './listdatadepartments.service';

describe('ListdatadepartmentsService', () => {
  let service: ListdatadepartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListdatadepartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
