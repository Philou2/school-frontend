import { TestBed } from '@angular/core/testing';

import { TeacherYearService } from './teacher-year.service';

describe('TeacherYearService', () => {
  let service: TeacherYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
