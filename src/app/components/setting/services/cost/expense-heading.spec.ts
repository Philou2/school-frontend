import { TestBed } from '@angular/core/testing';

import { ExpenseHeadingService } from './expense-heading';

describe('ExpenseHeadingService', () => {
    let service: ExpenseHeadingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExpenseHeadingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
