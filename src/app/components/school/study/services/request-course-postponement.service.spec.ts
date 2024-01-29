import { TestBed } from '@angular/core/testing';

import { RequestCoursePostponementService } from './request-course-postponement.service';

describe('RequestCoursePostponementService', () => {
  let service: RequestCoursePostponementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCoursePostponementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
