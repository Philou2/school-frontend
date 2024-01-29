import { TestBed } from '@angular/core/testing';

import { RegistrationFormService } from './registration-form';

describe('RegistrationFormService', () => {
    let service: RegistrationFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RegistrationFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
