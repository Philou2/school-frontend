import { TestBed } from '@angular/core/testing';

import { SpecialityYearService } from './speciality-year.service';

describe('SpecialityYearService', () => {
  let service: SpecialityYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialityYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
