import { TestBed } from '@angular/core/testing';

import { TimeTablePeriodService } from './time-table-period.service';

describe('TimeTablePeriodService', () => {
  let service: TimeTablePeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTablePeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
