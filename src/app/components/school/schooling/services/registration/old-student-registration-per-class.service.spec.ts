import { TestBed } from '@angular/core/testing';

import { OldStudentRegistrationPerClassService } from './old-student-registration-per-class.service';

describe('OldStudentRegistrationPerClassService', () => {
  let service: OldStudentRegistrationPerClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldStudentRegistrationPerClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
