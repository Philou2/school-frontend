import { TestBed } from '@angular/core/testing';

import {TeacherService} from './teacher.service';
import {StudentAttendanceService} from './student-attendance.service';

describe('StudentAttendanceService', () => {
  let service: StudentAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
