import { TestBed } from '@angular/core/testing';

import { ClassYearService } from './class-year.service';

describe('ClassYearService', () => {
  let service: ClassYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
