import { TestBed } from '@angular/core/testing';

import { CycleYearService } from './cycle-year.service';

describe('CycleYearService', () => {
  let service: CycleYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
