import { TestBed } from '@angular/core/testing';

import { TeacherYearService } from './teacher-year.service';
import {TeacherCourseRegistrationService} from './teacher-course-registration.service';

describe('TeacherCourseRegistrationService', () => {
  let service: TeacherCourseRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherCourseRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
