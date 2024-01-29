import { TestBed } from '@angular/core/testing';

import { CostAreaService } from './cost-area';

describe('CostAreaService', () => {
    let service: CostAreaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CostAreaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
