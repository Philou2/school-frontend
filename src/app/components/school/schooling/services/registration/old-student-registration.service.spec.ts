import { TestBed } from '@angular/core/testing';

import { OldStudentRegistrationService } from './old-student-registration.service';

describe('OldStudentRegistrationService', () => {
    let service: OldStudentRegistrationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OldStudentRegistrationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
