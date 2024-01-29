import { TestBed } from '@angular/core/testing';

import { PensionSchemeService } from './pension-scheme.service';

describe('PensionSchemeService', () => {
    let service: PensionSchemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PensionSchemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
