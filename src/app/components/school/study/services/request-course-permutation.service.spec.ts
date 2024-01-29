import { TestBed } from '@angular/core/testing';

import { RequestCoursePermutationService } from './request-course-permutation.service';

describe('RequestCoursePostponementService', () => {
  let service: RequestCoursePermutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCoursePermutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
