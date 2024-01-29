import { TestBed } from '@angular/core/testing';

import { StudCourseRegistrationService } from './stud-course-registration.service';

describe('StudCourseRegistrationService', () => {
  let service: StudCourseRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudCourseRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
