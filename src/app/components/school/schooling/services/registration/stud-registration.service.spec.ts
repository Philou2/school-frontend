import { TestBed } from '@angular/core/testing';

import { StudRegistrationService } from './stud-registration.service';

describe('TuitionService', () => {
    let service: StudRegistrationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudRegistrationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
